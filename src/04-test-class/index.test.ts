// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  let account: ReturnType<typeof getBankAccount>;
  const initialBalance = 500;
  const additionalMoney = 200;

  beforeEach(() => {
    account = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(501)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const newAccount = getBankAccount(1000);
    expect(() => account.transfer(initialBalance + 100, newAccount)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(initialBalance, account)).toThrow();
  });

  test('should deposit money', () => {
    account.deposit(additionalMoney);
    expect(account.getBalance()).toBe(initialBalance + additionalMoney);
  });

  test('should withdraw money', () => {
    account.withdraw(additionalMoney);
    expect(account.getBalance()).toBe(initialBalance - additionalMoney);
  });

  test('should transfer money', () => {
    const newAccount = getBankAccount(0);
    account.transfer(additionalMoney, newAccount);

    expect(newAccount.getBalance()).toBe(additionalMoney);
    expect(account.getBalance()).toBe(initialBalance - additionalMoney);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchSpy = jest.spyOn(account, 'fetchBalance').mockResolvedValue(0);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
    fetchSpy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchSpy = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(additionalMoney);
    await account.synchronizeBalance();
    const newBalance = account.getBalance();
    expect(newBalance).toBe(additionalMoney);
    fetchSpy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const fetchSpy = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    fetchSpy.mockRestore();
  });
});

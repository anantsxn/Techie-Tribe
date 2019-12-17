package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        Bank bobsAccount = new Bank("12345",50,"Bob Brown", "awddw@gmail.com","9876543210");
        bobsAccount.withdrawal(100);
        bobsAccount.deposit(50);
        bobsAccount.withdrawal(100);
        bobsAccount.deposit(51.0);
        bobsAccount.withdrawal(100);
    }
}

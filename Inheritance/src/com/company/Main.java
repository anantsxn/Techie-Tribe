package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        Animal animal = new Animal(1,1,5,5,"Animal");
        Dog dog = new Dog("Yorkie",8,20,2,4,1,20,"long silky");

        dog.eat();
        dog.walk();
        dog.run();
    }
}

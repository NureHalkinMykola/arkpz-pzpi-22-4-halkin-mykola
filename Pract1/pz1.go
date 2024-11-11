package main

import (
	"fmt"
	"log"
	"os"
)

// Поганий приклад
func xsdds(a, b int) int {
	return a + b
}

// Гарний приклад
func adder(n1, n2 int) int {
	return n1 + n2
}

// Для цього проекту
func boolToInt(in bool) int {
	if in {
		return 1
	} else {
		return 0
	}
}

// Для різних проектів
func BoolToInt(in bool) int {
	if in {
		return 1
	} else {
		return 0
	}
}

// Поганий приклад
func inttobool(in int) bool {
	if in > 0 {
		return true
	} else {
		return false
	}
}

// Гарний приклад
func intToBool(in int) bool {
	if in > 0 {
		return true
	} else {
		return false
	}
}

// Поганий приклад
func iteratorBad(numberOfTimes int) {
	for currentTime := 0; currentTime < numberOfTimes; currentTime++ {
		println(currentTime)
	}
}

// Гарний приклад
func iteratorGood(n int) {
	for i := 0; i < n; i++ {
		println(i)
	}
}

func freeFallCalculate() {
	// Поганий приклад
	println("Current speed in free fall:", 20*9.8)

	// Гарний приклад
	time := 20.0
	acceleration := 9.8
	speed := time * acceleration
	println("Current speed in free fall:", speed)
}

func divider(num1, num2 float32) (float32, error) {
	if num2 == 0 {
		return 0, fmt.Errorf("cannot divide by zero")
	}

	return num1 / num2, nil
}

// Поганий приклад
func readFileBad() {
	file, err := os.Open("file.txt")
	if err != nil {
		log.Fatal(err)
	}
	file.Close()
}

// Гарний приклад
func readFileGood() {
	file, err := os.Open("file.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
}

func main() {
	// Поганий приклад
	n1 := 20
	n2 := 15

	if n1%2 == 0 {
		println(n1, "is even")
	} else {
		println(n1, "is odd")
	}
	if n2%2 == 0 {
		println(n2, "is even")
	} else {
		println(n2, "is odd")
	}

	// Гарний приклад
	checkEven(n1)
	checkEven(n2)

	// Поганий приклад
	n1 = 10
	for i := 0; i < n1; i++ {
		adder(i, i+1)
	}

	// Гарний приклад
	n1 = 10
	for i := 0; i < n1; i++ {
		go adder(i, i+1)
	}
}

func checkEven(n int) {
	if n%2 == 0 {
		println(n, "is even")
	} else {
		println(n, "is odd")
	}
}

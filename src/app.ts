import { multiply } from 'operations/multiply.js'

const op1 = 20
const op2 = 30

let result: number

result = multiply(op1, op2)

console.log('The multiplication is:', multiply(op1, op2))

class Calculator {
    result: any
    multiply(a: number, b: number): number {
        return a * b
    }
}
function ControlRightMotor(x: number, y: number): number {
    return Math.trunc(rMotorMap[Math.idiv(y - 500, 103) + 4.5][Math.idiv(x - 500, 103) + 4.5] * 255)
}

function ControlLeftMotor(x2: number, y2: number): number {
    serial.writeValue("x2", Math.idiv(x2 - 500, 103) + 4.5)
    serial.writeValue("y2", Math.idiv(y2 - 500, 103) + 4.5)
    serial.writeValue("mapVal", Math.trunc(lMotorMap[Math.idiv(y2 - 500, 103) + 4.5][Math.idiv(x2 - 500, 103) + 4.5] * 255))
    return Math.trunc(lMotorMap[Math.idiv(y2 - 500, 103) + 4.5][Math.idiv(x2 - 500, 103) + 4.5] * 255)
}

let rMotorMap : number[][] = []
let lMotorMap : number[][] = []
radio.setGroup(1)
pins.setPull(DigitalPin.P13, PinPullMode.PullNone)
pins.setPull(DigitalPin.P14, PinPullMode.PullNone)
pins.setPull(DigitalPin.P15, PinPullMode.PullNone)
pins.setPull(DigitalPin.P16, PinPullMode.PullNone)
lMotorMap = [[-1, -1, -1, -1, -1, -0.75, -0.5, -0.25, 0], [-1, -0.9375, -0.875, -0.8125, -0.75, -0.5, -0.25, 0, 0.25], [-1, -0.875, -0.75, -0.625, -0.5, -0.25, 0, 0.25, 0.5], [-1, -0.8125, -0.625, -0.375, -0.25, 0, 0.25, 0.5, 0.75], [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1], [-0.75, -0.5, -0.25, 0, 0.25, 0.375, 0.625, 0.8125, 1], [-0.5, -0.25, 0, 0.25, 0.5, 0.625, 0.75, 0.875, 1], [-0.25, 0, 0.25, 0.5, 0.75, 0.8125, 0.875, 0.9375, 1], [0, 0.25, 0.5, 0.75, 1, 1, 1, 1, 1]]
rMotorMap = [[0, -0.25, -0.5, -0.75, -1, -1, -1, -1, -1], [0.25, 0, -0.25, -0.5, -0.75, -0.8125, -0.875, -0.9375, -1], [0.5, 0.25, 0, -0.25, -0.5, -0.625, -0.75, -0.875, -1], [0.75, 0.5, 0.25, 0, -0.25, -0.375, -0.625, -0.8125, -1], [1, 0.75, 0.5, 0.25, 0, -0.25, -0.5, -0.75, -1], [1, 0.8125, 0.625, 0.375, 0.25, 0, -0.25, -0.5, -0.75], [1, 0.875, 0.75, 0.625, 0.5, 0.25, 0, -0.25, -0.5], [1, 0.9375, 0.875, 0.8125, 0.75, 0.5, 0.25, 0, -0.25], [1, 1, 1, 1, 1, 0.75, 0.5, 0.25, 0]]
basic.forever(function on_forever() {
    if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        radio.sendString("Open")
    } else if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        radio.sendString("Close")
    } else if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        radio.sendString("LEDL")
    } else if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        radio.sendString("LEDR")
    } else {
        radio.sendValue("lMotor", ControlLeftMotor(pins.analogReadPin(AnalogPin.P1), pins.analogReadPin(AnalogPin.P2)))
        radio.sendValue("rMotor", ControlRightMotor(pins.analogReadPin(AnalogPin.P1), pins.analogReadPin(AnalogPin.P2)))
    }
    
})

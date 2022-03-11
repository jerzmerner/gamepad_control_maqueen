input.onButtonPressed(Button.A, function () {
    radio.sendString("neoPixelR")
})
input.onButtonPressed(Button.AB, function () {
    music.playMelody("E D G F B A C5 B ", 120)
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("Hiii")
})
function ControlMotor (x: number, y: number, motor: string) {
    if (motor == "R") {
        return Math.trunc(rMotorMap[Math.idiv(y - 500, 114) + 4.5][Math.idiv(x - 500, 114) + 4.5] * maxMotorSpeed)
    } else {
        return Math.trunc(lMotorMap[Math.idiv(y - 500, 114) + 4.5][Math.idiv(x - 500, 114) + 4.5] * maxMotorSpeed)
    }
}
let rMotorSpeed = 0
let lMotorSpeed = 0
let rMotorMap: number[][] = []
let lMotorMap: number[][] = []
let maxMotorSpeed = 0
radio.setGroup(1)
pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
maxMotorSpeed = 255
lMotorMap = [
[
-1,
-1,
-1,
-1,
-1,
-0.75,
-0.5,
-0.25,
0
],
[
-1,
-0.9375,
-0.875,
-0.8125,
-0.75,
-0.5,
-0.25,
0,
0.25
],
[
-1,
-0.875,
-0.75,
-0.625,
-0.5,
-0.25,
0,
0.25,
0.5
],
[
-1,
-0.8125,
-0.625,
-0.375,
-0.25,
0,
0.25,
0.5,
0.75
],
[
-1,
-0.75,
-0.5,
-0.25,
0,
0.25,
0.5,
0.75,
1
],
[
-0.75,
-0.5,
-0.25,
0,
0.25,
0.375,
0.625,
0.8125,
1
],
[
-0.5,
-0.25,
0,
0.25,
0.5,
0.625,
0.75,
0.875,
1
],
[
-0.25,
0,
0.25,
0.5,
0.75,
0.8125,
0.875,
0.9375,
1
],
[
0,
0.25,
0.5,
0.75,
1,
1,
1,
1,
1
]
]
rMotorMap = [
[
0,
-0.25,
-0.5,
-0.75,
-1,
-1,
-1,
-1,
-1
],
[
0.25,
0,
-0.25,
-0.5,
-0.75,
-0.8125,
-0.875,
-0.9375,
-1
],
[
0.5,
0.25,
0,
-0.25,
-0.5,
-0.625,
-0.75,
-0.875,
-1
],
[
0.75,
0.5,
0.25,
0,
-0.25,
-0.375,
-0.625,
-0.8125,
-1
],
[
1,
0.75,
0.5,
0.25,
0,
-0.25,
-0.5,
-0.75,
-1
],
[
1,
0.8125,
0.625,
0.375,
0.25,
0,
-0.25,
-0.5,
-0.75
],
[
1,
0.875,
0.75,
0.625,
0.5,
0.25,
0,
-0.25,
-0.5
],
[
1,
0.9375,
0.875,
0.8125,
0.75,
0.5,
0.25,
0,
-0.25
],
[
1,
1,
1,
1,
1,
0.75,
0.5,
0.25,
0
]
]
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        pins.digitalWritePin(DigitalPin.P12, 1)
        radio.sendString("Open")
    } else if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        pins.digitalWritePin(DigitalPin.P12, 1)
        radio.sendString("Close")
    } else if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        if (maxMotorSpeed < 245) {
            maxMotorSpeed += 10
        }
    } else if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        if (maxMotorSpeed > 8) {
            maxMotorSpeed += -10
        }
    } else if (pins.digitalReadPin(DigitalPin.P8) == 0) {
        radio.sendString("showOff")
    } else {
        lMotorSpeed = ControlMotor(pins.analogReadPin(AnalogPin.P1), pins.analogReadPin(AnalogPin.P2), "L")
        rMotorSpeed = ControlMotor(pins.analogReadPin(AnalogPin.P1), pins.analogReadPin(AnalogPin.P2), "R")
        radio.sendValue("lMotor", lMotorSpeed)
        radio.sendValue("rMotor", rMotorSpeed)
        led.plotBarGraph(
        lMotorSpeed + rMotorSpeed,
        511
        )
        pins.digitalWritePin(DigitalPin.P12, 0)
    }
})

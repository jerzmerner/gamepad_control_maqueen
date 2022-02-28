def ControlRightMotor(x: number, y: number):
    return int(rMotorMap[Math.idiv(y - 500, 103) + 4.5][Math.idiv(x - 500, 103) + 4.5] * 255)
def ControlLeftMotor(x2: number, y2: number):
    serial.write_value("x2", Math.idiv(x2 - 500, 103) + 4.5)
    serial.write_value("y2", Math.idiv(y2 - 500, 103) + 4.5)
    serial.write_value("mapVal",
        int(lMotorMap[Math.idiv(y2 - 500, 103) + 4.5][Math.idiv(x2 - 500, 103) + 4.5] * 255))
    return int(lMotorMap[Math.idiv(y2 - 500, 103) + 4.5][Math.idiv(x2 - 500, 103) + 4.5] * 255)
rMotorMap: List[List[number]] = []
lMotorMap: List[List[number]] = []
radio.set_group(1)
pins.set_pull(DigitalPin.P13, PinPullMode.PULL_NONE)
pins.set_pull(DigitalPin.P14, PinPullMode.PULL_NONE)
pins.set_pull(DigitalPin.P15, PinPullMode.PULL_NONE)
pins.set_pull(DigitalPin.P16, PinPullMode.PULL_NONE)
lMotorMap = [[-1, -1, -1, -1, -1, -0.75, -0.5, -0.25, 0],
    [-1, -0.9375, -0.875, -0.8125, -0.75, -0.5, -0.25, 0, 0.25],
    [-1, -0.875, -0.75, -0.625, -0.5, -0.25, 0, 0.25, 0.5],
    [-1, -0.8125, -0.625, -0.375, -0.25, 0, 0.25, 0.5, 0.75],
    [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1],
    [-0.75, -0.5, -0.25, 0, 0.25, 0.375, 0.625, 0.8125, 1],
    [-0.5, -0.25, 0, 0.25, 0.5, 0.625, 0.75, 0.875, 1],
    [-0.25, 0, 0.25, 0.5, 0.75, 0.8125, 0.875, 0.9375, 1],
    [0, 0.25, 0.5, 0.75, 1, 1, 1, 1, 1]]
rMotorMap = [[0, -0.25, -0.5, -0.75, -1, -1, -1, -1, -1],
    [0.25, 0, -0.25, -0.5, -0.75, -0.8125, -0.875, -0.9375, -1],
    [0.5, 0.25, 0, -0.25, -0.5, -0.625, -0.75, -0.875, -1],
    [0.75, 0.5, 0.25, 0, -0.25, -0.375, -0.625, -0.8125, -1],
    [1, 0.75, 0.5, 0.25, 0, -0.25, -0.5, -0.75, -1],
    [1, 0.8125, 0.625, 0.375, 0.25, 0, -0.25, -0.5, -0.75],
    [1, 0.875, 0.75, 0.625, 0.5, 0.25, 0, -0.25, -0.5],
    [1, 0.9375, 0.875, 0.8125, 0.75, 0.5, 0.25, 0, -0.25],
    [1, 1, 1, 1, 1, 0.75, 0.5, 0.25, 0]]

def on_forever():
    if pins.digital_read_pin(DigitalPin.P15) == 0:
        radio.send_string("Open")
    elif pins.digital_read_pin(DigitalPin.P13) == 0:
        radio.send_string("Close")
    elif pins.digital_read_pin(DigitalPin.P16) == 0:
        radio.send_string("LEDL")
    elif pins.digital_read_pin(DigitalPin.P14) == 0:
        radio.send_string("LEDR")
    else:
        radio.send_value("lMotor",
            ControlLeftMotor(pins.analog_read_pin(AnalogPin.P1),
                pins.analog_read_pin(AnalogPin.P2)))
        radio.send_value("rMotor",
            ControlRightMotor(pins.analog_read_pin(AnalogPin.P1),
                pins.analog_read_pin(AnalogPin.P2)))
basic.forever(on_forever)

def on_button_pressed_a():
    radio.send_string("neoPixelR")
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    radio.send_string("neoPixelB")
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    radio.send_string("neoPixelG")
input.on_button_pressed(Button.B, on_button_pressed_b)

def ControlMotor(x: number, y: number, motor: str):
    if motor == "R":
        return int(rMotorMap[Math.idiv(y - 500, 114) + 4.5][Math.idiv(x - 500, 114) + 4.5] * maxMotorSpeed)
    else:
        return int(lMotorMap[Math.idiv(y - 500, 114) + 4.5][Math.idiv(x - 500, 114) + 4.5] * maxMotorSpeed)
rMotorSpeed = 0
lMotorSpeed = 0
rMotorMap: List[List[number]] = []
lMotorMap: List[List[number]] = []
radio.set_group(1)
pins.set_pull(DigitalPin.P8, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P13, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P14, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P15, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P16, PinPullMode.PULL_UP)
maxMotorSpeed = 255
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
    global lMotorSpeed, rMotorSpeed
    if pins.digital_read_pin(DigitalPin.P15) == 0:
        pins.digital_write_pin(DigitalPin.P12, 1)
        radio.send_string("Open")
    elif pins.digital_read_pin(DigitalPin.P13) == 0:
        pins.digital_write_pin(DigitalPin.P12, 1)
        radio.send_string("Close")
    elif pins.digital_read_pin(DigitalPin.P16) == 0:
        radio.send_string("LEDL")
    elif pins.digital_read_pin(DigitalPin.P14) == 0:
        radio.send_string("LEDR")
    elif pins.digital_read_pin(DigitalPin.P8) == 0:
        if pins.digital_read_pin(DigitalPin.P15) == 0:
            radio.send_string("Honk")
        else:
            radio.send_string("showOff")
    else:
        lMotorSpeed = ControlMotor(pins.analog_read_pin(AnalogPin.P1),
            pins.analog_read_pin(AnalogPin.P2),
            "L")
        rMotorSpeed = ControlMotor(pins.analog_read_pin(AnalogPin.P1),
            pins.analog_read_pin(AnalogPin.P2),
            "R")
        radio.send_value("lMotor", lMotorSpeed)
        radio.send_value("rMotor", rMotorSpeed)
        led.plot_bar_graph(lMotorSpeed + rMotorSpeed, 511)
        pins.digital_write_pin(DigitalPin.P12, 0)
basic.forever(on_forever)

import React from "react";
import "./Calculator.css";

const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit",
  k: "Kelvin",
};

function toCelsius(temp, scale) {
  if (scale === "f") return ((temp - 32) * 5) / 9;
  else if (scale === "k") return temp - 273.15;
}

function toFahrenheit(temp, scale) {
  if (scale === "c") return (temp * 9) / 5 + 32;
  else if (scale === "k") return (temp - 273.15) * 1.8 + 32;
}

function toKelvin(temp, scale) {
  if (scale === "c") return temp + 273.15;
  else if (scale === "f") return (temp - 32) / 1.8 + 273.15;
}

function tryConvert(temperature, scale, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input, scale);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.handleKelvinChange = this.handleKelvinChange.bind(this);
    this.state = { temperature: "", scale: "c" };
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: "c", temperature });
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: "f", temperature });
  }

  handleKelvinChange(temperature) {
    this.setState({ scale: "k", temperature });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale !== "c" ? tryConvert(temperature, scale, toCelsius) : temperature;
    const fahrenheit =
      scale !== "f"
        ? tryConvert(temperature, scale, toFahrenheit)
        : temperature;
    const kelvin =
      scale !== "k" ? tryConvert(temperature, scale, toKelvin) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <TemperatureInput
          scale="k"
          temperature={kelvin}
          onTemperatureChange={this.handleKelvinChange}
        />
      </div>
    );
  }
}

export default Calculator;

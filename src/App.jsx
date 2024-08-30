
import React, { useState } from "react";
import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import ButtonBox from './components/ButtonBox';
import Button from './components/Button';
import './App.css';

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "*"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "←", "="],  
];


const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  // number click handler
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 20) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
              ? toLocaleString(Number(removeSpaces(calc.num + value)))
              : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  // comma click handler
  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  // invert click handler
  const invertClickHandler = () => {
    setCalc(calc => ({
      ...prevCalc,
      num: calc.num ? toLocaleString(removeSpaces(prevCalc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(prevCalc.res) * -1) : 0,
      sign: calc.sign,
    }));
  };

  // percent click handler
  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
    setCalc(calc => ({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    }));
  };

  // reset click handler
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0
    });
  };

  // sign click handler
  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc(calc => ({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0
    }));
  };

  // Backspace (Cancel) click handler
const deleteClickHandler = () => {
  setCalc(calc => ({
    ...calc,
    num: calc.num.length > 1
      ? toLocaleString(removeSpaces(calc.num).slice(0, -1))
      : 0,
  }));
};


  // equal click handler
  const equalClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
            ? a - b
            : sign === "*"
              ? a * b
              : a / b;
      setCalc(calc => ({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
              math(
                Number(removeSpaces(calc.res)),
                Number(removeSpaces(calc.num)),
                calc.sign
              )
            ),
        sign: "",
        num: 0,
      }));
    }
  };
 
  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                    ? invertClickHandler
                    : btn === "%"
                      ? percentClickHandler
                      : btn === "="
                        ? equalClickHandler
                        : btn === "/" || btn === "*" || btn === "-" || btn === "+"
                          ? signClickHandler
                          : btn === "."
                            ? commaClickHandler
                            : btn === "←"
                              ? deleteClickHandler
                              : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
    
  );
};

export default App;
import React, { useState } from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { array } from "prop-types";

const linearSearch = (arr, keySearch) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === keySearch) {
      result.push(
        "Round : " +
          (i + 1) +
          " ===> " +
          keySearch +
          " = " +
          arr[i] +
          " found!!"
      );
      break;
    } else {
      result.push(
        "Round : " + (i + 1) + " ===> " + keySearch + " != " + arr[i]
      );
    }
  }
  return result;
};

const binarySearch = (arr, keySearch) => {
  let result = [];
  let numArray = arr.sort((a, b) => a - b);
  let min_v = numArray[0];
  let max_v = numArray[numArray.length - 1];
  let result_arr;
  if (keySearch >= min_v && keySearch <= max_v) {
    result_arr = binaryCal(numArray, keySearch, [], 0);
    result_arr = result_arr.filter(Number);
    console.log("result_arr:" + result_arr);
  }
  result_arr.map((item, i) => {
    if (item === keySearch) {
      result.push(
        "Round : " + (i + 1) + " ===> " + keySearch + " = " + item + " found!!"
      );
    } else {
      result.push("Round : " + (i + 1) + " ===> " + keySearch + " != " + item);
    }
  });
  return result;
};

const binaryCal = (arr, target, return_arr, loopChk) => {
  loopChk = loopChk + 1;
  let min_v = arr[0];
  let max_v = arr[arr.length - 1];
  let mid = Math.floor((min_v + max_v) / 2);
  let midKey = null;
  let midVal = null;
  let newArr = [];
  let chk = false;
  console.log("mid:" + mid);
  arr.map((item, index) => {
    if (item <= mid) {
      midKey = index;
      midVal = item;
    }
  });
  if (midVal <= target) {
    //จะได้ Mid < Target เพราะฉะนั้น ให้เลื่อน Low ขึ้นมาเป็น Mid + 1
    chk = true;
    midKey = midKey + 1;
    arr.map((item, index) => {
      if (item > midVal) {
        newArr.push(item);
      }
    });
  } else if (midVal >= target) {
    chk = true;
    midKey = midKey - 1;
    arr.map((item, index) => {
      if (item < midVal) {
        newArr.push(item);
      }
    });
  }

  return_arr.push(midVal);
  //console.log("midVal:" + midVal);
  //console.log(newArr);
  //console.log("-----------");
  if (chk === true && newArr.length > 0 && midVal != target && loopChk <= 100) {
    return_arr.push(binaryCal(newArr, target, return_arr, loopChk));
  }
  return return_arr;
};

const bubbleSearch = (arr, keySearch) => {
  let result = [];
  let return_arr = [];
  return_arr = bubbleCal(arr, keySearch);
  return_arr.map((item, i) => {
    if (item === keySearch) {
      result.push(
        "Round : " + (i + 1) + " ===> " + keySearch + " = " + item + " found!!"
      );
    } else {
      result.push("Round : " + (i + 1) + " ===> " + keySearch + " != " + item);
    }
  });
  return result;
};

const bubbleCal = (arr, target) => {
  let result = [];
  //console.log(target + ":" + target);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      //console.log("yes:" + i + ":" + arr[i]);
      result.push(arr[i]);
      break;
    } else {
      //console.log("no:" + i + ":" + arr[i]);
      result.push(arr[i]);
    }
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
  //console.log("arr:" + arr);
  return result;
};

const MyForm = ({}) => {
  const [inputList, setInputList] = useState("9,1,6,2,4,10,8,7,5,3");
  const [inputSearch, setInputSearch] = useState("4");
  const [inputType, setInputType] = useState(1);
  const [resultData, setResultData] = useState([]);
  const [result, setResult] = useState({ list: "", search: "" });
  const search = () => {
    let arr = inputList.split(",").map(Number);
    let result = [];
    if (inputType === 1) {
      result = linearSearch(arr, parseInt(inputSearch));
    } else if (inputType === 2) {
      result = binarySearch(arr, parseInt(inputSearch));
    } else if (inputType === 3) {
      result = bubbleSearch(arr, parseInt(inputSearch));
    }
    setResultData(result);
    setResult({ list: "[" + inputList + "]", search: inputSearch });
  };

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="sm">
        <h2>Programmer test1</h2>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                label="List"
                fullWidth
                value={inputList}
                onChange={e => setInputList(e.target.value)}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="standard-basic"
                label="ค้นหา"
                fullWidth
                value={inputSearch}
                onChange={e => setInputSearch(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => search()}
              >
                ค้นหา
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography>ประเภทการค้นหา</Typography>
            </Grid>
            <Grid item xs={12}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                value={inputType}
                onChange={e => setInputType(e.target.value)}
              >
                <MenuItem value={1}>Linear Search</MenuItem>
                <MenuItem value={2}>Binary Search</MenuItem>
                <MenuItem value={3}>Bubble Search</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </form>
        <br />
        ผลลัพธ์
        {result.list != "" && (
          <div
            style={{
              marginTop: 20,
              borderStyle: "solid",
              padding: 5,
              borderRadius: 5,
              borderWidth: 1
            }}
          >
            <p>List:{result.list}</p>
            <p>Search:{result.search}</p>
            {resultData.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default MyForm;

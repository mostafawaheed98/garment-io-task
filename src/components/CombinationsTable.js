import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRemove } from '@fortawesome/free-solid-svg-icons'
import {colors as colorSet} from '../constants';
import {sizes as sizeSet} from '../constants';

function CombinationsTable() {

  // Initializing all needed states
  const [columns, setColumns] = useState([{size: -1, values:[""], colSum: 0}]);
  const [rows, setRows] = useState([{color: -1, values:[""], rowSum: 0}]);
  const [totalCombination , setTotalCombination ] = useState(0);

  const [colors, setColors] = useState(colorSet.map((color, index)=> ({colorIndex: index+1, colorValue: color, isSelected: false})));
  const [sizes, setSizes] = useState(sizeSet.map((size, index)=> ({sizeIndex: index+1, sizeValue: size, isSelected: false})));

  /*
    * 'addNewColumn()' handler
    * This function adds a new column 'size' in the 'combination' table
    * Also, it generate the 'quantity' inputs for this newly added column
    * It receives no prapms
  */
  const addNewColumn = () => {
      let colValues =[""];
      for (let i = 1; i < rows.length; i++) {
        colValues.push("");
      }
      setColumns((prevColumns) => [
        ...prevColumns,
        {size: -1, values: colValues, colSum: 0},
      ]);
      setRows((prevRows) => (prevRows.map((row) => ({...row, values: [...row.values, ""]}))));
  };

  /*
    * 'deleteColumn()' handler
    * This function deletes a specific column 'size' from the 'combination' table based on its index
    * Also, it delete the 'quantity' inputs of this deleted column
    * Also, it updates the 'sum' of all rows
    * Also, it enables old size in the sizes '<select>' box again
    * It receives one prapm: 'index' [The index of the column to be deleted]  
  */
  const deleteColumn = (index) => {
      if (columns.length === 1) {
          alert("There Should be at least 1 Size!");
          return;
      }
      let oldSize = columns[index].size
      setColumns((prevColumns) => prevColumns.filter((col, i) => i !== index));
  
      setRows((prevRows) => prevRows.map((row) => ({
        ...row, 
        values: row.values.filter((rw, i) => i !== index),
      })));

      setRows((prevRows) => prevRows.map((row) => ({
        ...row, 
        rowSum: parseInt(row.values.reduce((total, newValue) => total + newValue, 0))
      })));

      // Enable old size in the sizes '<select>' box again
      setSizes(prevSizes => prevSizes.map(size=> {
        if (size.sizeIndex === oldSize){
          size.isSelected = false;
          return size;
        }else return size;
      }))
  };

  /*
    * 'addNewRow()' handler
    * This function adds a new row 'color' in the 'combination' table
    * Also, it generate the 'quantity' inputs for this newly added row
    * It receives no prapms
  */
  const addNewRow = () => {
      let rowArray = [""];
      for (let i = 1; i < columns.length; i++) {
        rowArray.push("");
      }
      setRows((prevRows) => [...prevRows, {color: -1, values: rowArray, rowSum: 0}]);
      setColumns((prevCols) => (prevCols.map((col) => ({...col, values: [...col.values, ""]}))));
  };

  /*
    * 'deleteRow()' handler
    * This function deletes a specific row 'color' from the 'combination' table based on its index
    * Also, it deletes the 'quantity' inputs of this deleted row
    * Also, it updates the 'sum' of all columns
    * Also, it enables deleted color in the colors '<select>' box again
    * It receives one prapm: 'index' [The index of the row to be deleted]  
  */
  const deleteRow = (index) => { 
      if (rows.length === 1) {
          alert("There Should be at least 1 Color!");
          return;
      }
      let oldColor = rows[index].color; 
      setRows((prevRows) => prevRows.filter((row, i) => i !== index));

      setColumns((prevCols) => prevCols.map((col) => ({
        ...col, 
        values: col.values.filter((rw, i) => i !== index),
      })));

      setColumns((prevCols) => prevCols.map((col) => ({
        ...col, 
        colSum: parseInt(col.values.reduce((total, newValue) => total + newValue, 0))
      })));

      // Enable deleted color in the colors '<select>' box again
      setColors(prevColors => prevColors.map(color=> {
        if (color.colorIndex === oldColor){
          color.isSelected = false;
          return color;
        }else return color;
      }))
  };

  /*
    * 'handleColSize()' handler
    * This function updates the 'size' of a specific column in the 'combination' table based on its index
    * Also, it disables the selected size and enables old size in the sizes '<select>' box 
    * It receives two prapms: - 'val' [The value of the color]  
    *                         - 'i' [The index of the column to be updated]
  */
  const handleColSize = (val, i)=>{
      val = parseInt(val)
      const oldSize = parseInt(columns[i].size);
      setColumns(columns.map((col, index)=> (index === i? {...col, size: val} : col )));

      // Disable selected size in the sizes '<select>' box 
      setSizes(prevSizes => prevSizes.map(size=> {
        if (size.sizeIndex === val){
          size.isSelected = true;
          return size;
        }else return size;
      }))
      // Enable old size in the sizes '<select>' box 
      setSizes(prevSizes => prevSizes.map(size=> {
        if (size.sizeIndex === oldSize){
          size.isSelected = false;
          return size;
        }else return size;
      }))
  }

  /*
    * 'handleRowColor()' handler
    * This function updates the 'color' of a specific row in the 'combination' table based on its index
    * Also, it disables the selected color and enables old color in the colors '<select>' box 
    * It receives two prapms: - 'val' [The value of the color]  
    *                         - 'i' [The index of the column to be updated]  
  */
  const handleRowColor = (val, i)=>{
      val = parseInt(val)
      const oldColor = rows[i].color;
      setRows(rows.map((row, index)=> (index === i? {...row, color: val} : row )));

      // Disable selected color in the colors '<select>' box 
      setColors(prevColors => prevColors.map(color=> {
        if (color.colorIndex === val){
          color.isSelected = true;
          return color;
        }else return color;
      }))
      // Enable old color in the colors '<select>' box 
      setColors(prevColors => prevColors.map(color=> {
        if (color.colorIndex === oldColor){
          color.isSelected = false;
          return color;
        }else return color;
      }))
  }

  /*
    * 'handleQuantityChange()' handler
    * This function updates the 'quantity' value of any specific input in the 'combination' table based on its index
    * Also, it updates the 'sum' of each row & column according the change of the 'quantity' input's value
    * It receives three prapms: - 'val' [The value of the color]  
    *                           - 'rowIndex' [The index of the row of the input to be updated] 
    *                           - 'colIndex' [The index of the column of the input to be updated]  
  */
  const handleQuantityChange = (val, rowIndex, colIndex) => {
      // Update 'quantity' and 'sum' in each row
      const rowFields = rows[rowIndex].values.map((row, i) => (i === colIndex ? val : row));
      let currentRowSum = 0;
      rowFields.map(rowField => rowField ? currentRowSum = parseInt(rowField) + currentRowSum : currentRowSum += 0);
      setRows(rows.map((row, i) => (i === rowIndex ? {...row, values: rowFields, rowSum: currentRowSum} : row)));

      // Set 'quantity' values and update 'sum' in each column
      const columnFields = columns[colIndex].values.map((col, i) => (i === rowIndex ? val : col));
      let currentColSum = 0;
      columnFields.map(columnField => columnField ? currentColSum = parseInt(columnField) + currentColSum : currentColSum += 0 );
      setColumns(columns.map((col, i) => (i === colIndex ? {...col, values: columnFields, colSum: currentColSum} : col)));        
  };

  /*
    * 'printCombinations()' handler
    * This function prints an array of objects for all combinations of the table
    * The objects are in the following form: {color: 'SELECTED COLOE', size: 'SELECTED SIZE', quantity: 'ENTERED QUANTITY'} 
    * It receives no prapms  
  */  
  const printCombinations = (e) => {
      e.preventDefault();
      const combinations = [];
      rows.forEach((row, index) => {
        columns.forEach((col, i) => {
          const combinationObj = {};
          combinationObj.color = rows[index].color !== -1? colors[(rows[index].color)-1].colorValue : "No Color Chosen" ;
          combinationObj.size = col.size !== -1? parseInt(col.size) : "No Size Chosen" ;
          combinationObj.quantity = parseInt(row.values[i]);
          combinations.push(combinationObj);
        });
      });
      console.log(combinations)
  };

  // This useEffect() function updates the total of all combination on every change in any of columns' sum 
  useEffect(() => {
      let total = 0;
      columns.forEach((col)=>{
        total += parseInt(col.colSum);
      });
      setTotalCombination(total); 
  }, [rows,columns]);  
  
  return (
      <div className='mt-5'>
          <h2>Select Your Combinations</h2>
          <hr/>
          <form onSubmit={(e)=> printCombinations(e)}>
          <table className="table table-bordered" id='combinationsTable'>
              <thead>
                  <tr>
                      <th scope="col">
                          <button className='btn btn-light' title='Add New Color' onClick={addNewRow}><FontAwesomeIcon icon={faPlus}/></button>
                          <button className='btn btn-primary' title='Add New Size' onClick={addNewColumn}><FontAwesomeIcon icon={faPlus}/></button>
                      </th>
                      {columns.map((col, index) => (
                          <th key={index + 999999}>
                              <div className='input-group'>
                              <button className='btn btn-danger me-1' title='Delete tihs Size' onClick={()=>deleteColumn(index)}><FontAwesomeIcon icon={faRemove}/></button>
                                <select className="form-select form-select-sm" value={columns[index].size} onChange={(e)=>{handleColSize(e.target.value, index)}}>
                                    <option value={-1} key={-1}>Select Size</option>
                                    {sizes.map((size)=>(
                                        <option value={size.sizeIndex} key={size.sizeValue} disabled={size.isSelected}>{size.sizeValue}</option>
                                    ))}
                                </select>
                              </div>
                          </th>
                      ))}
                      <th className='text-center'>Size/Total</th>
                  </tr>
              </thead>
              <tbody>
              {rows.map((data, index) => (
                <tr key={index + 5}>
                    <td className="text-center">
                        <div className='input-group'>
                          <button className='btn btn-danger me-1' title='Delete tihs Color' onClick={()=>deleteRow(index)}><FontAwesomeIcon icon={faRemove}/></button> 
                          <select className="form-select form-select-sm" value={rows[index].color} onChange={(e)=>{handleRowColor(e.target.value, index)}}>
                              <option value={-1} key={-1}>Select Color</option>
                              {colors.map((color, index)=>(
                                  <option value={index+1} key={color.colorValue} disabled={color.isSelected}>{color.colorValue}</option>
                              ))}
                          </select>
                        </div>
                    </td>
                  {columns.map((col, index2) => (
                    <td key={index2 + 988}>
                      <input
                        required
                        type="number"
                        className="form-control text-center"
                        placeholder={`Enter Quantity`}
                        value={rows[index].values[index2]}
                        onChange={(e) =>
                          handleQuantityChange(e.target.value, index, index2)
                        }
                      />
                    </td>
                  ))}
                  <td className="text-center">
                    <span className="badge bg-secondary">{rows[index].rowSum}</span>
                  </td>
                </tr>
              ))}
              </tbody>
              <tfoot className="text-center">
                  <tr>
                      <th className='text-center'>Color/Total</th>
                      {columns.map((col, index) => (
                          <th key={index + 999999}>
                              <span className="badge bg-secondary">{columns[index].colSum}</span>
                          </th>
                      ))}
                      <th scope="col"><span className="badge bg-secondary">{totalCombination}</span></th>
                  </tr>
              </tfoot>
          </table>
          <button className='btn btn-success' type='submit'>Submit</button>
          </form>
      </div>
  );
}

export default CombinationsTable;
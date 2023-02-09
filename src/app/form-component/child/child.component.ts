import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent {
  // Two output event emitters : One for the custom value that is entered
  // based off select menu choice.
  // Second eventEmitter for setting a boolean flag in case user's
  // pattern matches false for error validation
  @Output() customVal = new EventEmitter<string>();
  @Output() isMatch = new EventEmitter<boolean>();

  inputField: HTMLInputElement | null = document.querySelector('#customInput');
  //Selected Value : The dropdown option user will chose
  selectedValue: string = '';
  isWrong: boolean = false;
  errMsg: string = '';
  // InputData : The data entered by user for corresponding data type
  inputData: any;
  noMsg = 'No text entered';
  //Custom Pattern : The pattern that should test our input text based off the select value
  customPattern!: RegExp;
  options = ['Number', 'String', 'Hex', 'Binary'];
  childData = new FormGroup({
    customInp: new FormControl(''),
    dropDownval: new FormControl(''),
  });

  onChange(val: string) {
    this.selectedValue = val;
    this.customInp?.setValue('');
    console.log(this.selectedValue);

    this.determinePattern();
    this.validateData();
  }

  // Custom function that will determine what pattern
  // to match based on dropDown option selected
  determinePattern() {
    if (this.selectedValue === 'Number') {
      //Pattern to match for numbers
      this.customPattern = /^\d+$/;
    }
    if (this.selectedValue === 'String') {
      this.customPattern = /^\w+$/;
    }
    if (this.selectedValue === 'Hex') {
      this.customPattern = /^#[a-fA-F0-9]{6}$/;
    }
    if (this.selectedValue === 'Binary') {
      this.customPattern = /^[0-1]+$/;
    }
  }
  validateData() {
    // edge case 1 : if no text is entered
    if (this.inputData === this.noMsg) {
      // Handle error
      this.isWrong = true;
      this.errMsg = 'Enter some text first';
      // alert('Enter Text');
    } else {
      console.log(
        'testing the pattern',
        this.customPattern.test(this.inputData)
      );
      if (this.customPattern.test(this.inputData)) {
        this.isWrong = false;
        this.customVal.emit(this.inputData);
      } else {
        this.isWrong = true;
        this.errMsg = `Input data does not follow ${this.selectedValue}`;
      }
    }
  }
  newFn() {
    this.inputData = this.customInp?.value || this.noMsg;
    console.log(this.inputData);
    // Test data with customPattern
    this.validateData();
  }

  // Getter methods for formControl
  get customInp() {
    return this.childData.get('customInp');
  }
}

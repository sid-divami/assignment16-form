import { Component, EventEmitter, Output } from '@angular/core';
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
  //Selected Value : The dropdown option user will chose
  selectedValue: string = '';
  // InputData : The data entered by user for corresponding data type
  inputData!: string;

  //Custom Pattern : The pattern that should test our input text based off the select value
  customPattern!: RegExp;
  options = ['Number', 'String', 'Hex', 'Binary'];
  childData = new FormGroup({
    customInp: new FormControl(''),
    dropDownval: new FormControl(''),
  });

  onChange(val: string) {
    this.selectedValue = val;
    this.determinePattern();
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
      this.customPattern = /^#[a-fA-F0-9]+$/;
    }
    if (this.selectedValue === 'Binary') {
      this.customPattern = /^[0-1]+$/;
    }
  }
  validateData() {
    if (this.customInp.value !== null || this.customInp.value !== undefined) {
      this.inputData = this.customInp.value;
    }
  }

  // Getter methods for formControl
  get customInp() {
    return this.childData.get('customInp');
  }
}

import React, { Component } from 'react';

import { Formik, Form, FieldArray } from 'formik';

import * as yup from 'yup';

import { AutoComplete } from '../../components/autocomplete/AutoComplete';
import { Calendar } from '../../components/calendar/Calendar';
import { Checkbox } from '../../components/checkbox/Checkbox';
import { ColorPicker } from '../../components/colorpicker/ColorPicker';
import { Chips } from '../../components/chips/Chips';
import { Dropdown } from '../../components/dropdown/Dropdown';
import { Editor } from '../../components/editor/Editor';
import { InputMask } from '../../components/inputmask/InputMask';
import { InputSwitch } from '../../components/inputswitch/InputSwitch';
import { InputText } from '../../components/inputtext/InputText';
import { InputTextarea } from '../../components/inputtextarea/InputTextarea';
import { ListBox } from '../../components/listbox/ListBox';
import { MultiSelect } from '../../components/multiselect/MultiSelect';
import { Password } from '../../components/password/Password';
import { RadioButton } from '../../components/radiobutton/RadioButton';
import { Rating } from '../../components/rating/Rating';
import { SelectButton } from '../../components/selectbutton/SelectButton';
import { Slider } from '../../components/slider/Slider';
import { Spinner } from '../../components/spinner/Spinner';
import { TriStateCheckbox } from '../../components/tristatecheckbox/TriStateCheckbox';
import { ToggleButton } from '../../components/togglebutton/ToggleButton';



import { CountryService } from '../service/CountryService';


import { Link } from 'react-router-dom';
import { Card } from '../../components/card/Card';
import { Button } from '../../components/button/Button';
import { TabView, TabPanel } from '../../components/tabview/TabView';
import { CodeHighlight } from '../codehighlight/CodeHighlight';


const validationSchema = yup.object().shape({
    autoCompleteValue: yup.string().required().oneOf(["France", "Germany"]),
    checkboxValues: yup.array().required(),
    colorPickerValue: yup.string().required().oneOf(["ffffff"]),
    chipsValues: yup.array().required(),
    dropdownValue: yup.object().required().shape({
        name: yup.string().oneOf(['Istanbul']),
        code: yup.string().required()
    }),
    editorValue: yup.string().required(),
    inputMaskValue: yup.string().required(),
    inputSwitchValue: yup.boolean().oneOf([true]),
    inputTextValue: yup.string().required(),
    inputTextareavalue: yup.string().required(),
    listBoxValue: yup.object().required().shape({
        name: yup.string().oneOf(['Paris']),
        code: yup.string().required()
    }),
    multiSelectValue: yup.array().required(),
    passwordValue: yup.string().required(),
    radioButtonValue: yup.string().required().oneOf(["New York"]),
    ratingValue: yup.number().required().min(5),
    selectButtonValue: yup.object().required().shape({
        name: yup.string().oneOf(['Istanbul']),
        code: yup.string().required()
    }),
    sliderValue: yup.number().required().min(80),
    spinnerValue: yup.number().required().min(40),
    triStateCheckboxValue: yup.boolean().required(),
    toggleButtonValue: yup.boolean().required().oneOf([true]),




});

const validate = (values) => {
    const typeOfCalendarValue = typeof (values.calendarValue);
    const errors = {};
    if (!typeOfCalendarValue || typeOfCalendarValue == 'string') {
        errors.calendarValue = "calendarValue is required";
    } else if (typeof (values.calendarValue.getTime) == 'function' && values.calendarValue.getTime() < 1577833200000) {
        errors.calendarValue = "calendarValue must be after 2020/01/01";

    }
    return errors;
}



const initialFormValues = {
    autoCompleteValue: 'Switzerland',
    inputTextValue: 'input text value',
    calendarValue: new Date(),
    checkboxValues: ['New York'],
    colorPickerValue: '1976D2',
    chipsValues: ['value1'],
    dropdownValue: { name: 'New York', code: 'NY' },
    editorValue: 'editorValue',
    inputMaskValue: '11-111111',
    inputSwitchValue: true,
    inputTextareavalue: 'inputTextareavalue',
    listBoxValue: { name: 'New York', code: 'NY' },
    multiSelectValue: [{ name: 'New York', code: 'NY' }],
    passwordValue: '1234',
    radioButtonValue: 'New York',
    ratingValue: 3,
    selectButtonValue: { name: 'New York', code: 'NY' },
    sliderValue: 50,
    spinnerValue: 20,
    triStateCheckboxValue: false,
    toggleButtonValue: true

}

const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
];

export class FormikDemo extends Component {


    componentDidMount() {
        this.countryservice.getCountries(this);
        this.brands = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo'];
    }

    filterCountrySingle(event) {
        setTimeout(() => {
            var results = this.state.countriesData.filter((country) => {
                return country.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
            this.setState({ filteredCountriesSingle: results });
        }, 250);
    }

    onCityChange(e, values, cities, setValues) {
        let selectedCities = [...cities];

        if (e.target.checked)
            selectedCities.push(e.target.value);
        else
            selectedCities.splice(selectedCities.indexOf(e.value), 1);

        setValues({ ...values, checkboxValues: selectedCities });
    }

    constructor() {
        super();
        this.countryservice = new CountryService();
        this.state = {
            countriesData: [],
            filteredCountriesSingle: null,
            filteredBrands: null,
            filteredCountriesMultiple: null,
            formValues: null
        };
        this.filterCountrySingle = this.filterCountrySingle.bind(this);
    }

    render() {
        const header = (
            <img alt="Card" src='showcase/resources/demo/images/usercard.png' />
        );
        const footer = (
            <span>
                <Button label="Save" icon="pi pi-check" />
                <Button label="Cancel" icon="pi pi-times" className="ui-button-secondary" />
            </span>
        );

        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Formik</h1>
                        <p>Build forms in React, without the tears.</p>
                    </div>
                </div>

                <div className="content-section implementation">

                    <Formik
                        initialValues={initialFormValues}
                        validationSchema={validationSchema}
                        validate={validate}
                        onSubmit={(values) => { this.setState({ formValues: values }) }}
                        render={props =>
                            <Form>
                                {props.errors.global ? <ul style={{ color: 'red' }}><li>{props.errors.global.length} global error(s):</li>{props.errors.global.map((error) => { return <li>{error}</li> })}</ul> : <span>No global errors</span>}
                                <br/>
                                <div className="content-section implementation">
                                    <div className="ui-g" style={{ fontWeight: 'bold' }}>
                                        <div className="ui-g-2">Input type</div>
                                        <div className="ui-g-2">Input</div>
                                        <div className="ui-g-2">Current value</div>
                                        <div className="ui-g-2">Touched (onBlur event)</div>
                                        <div className="ui-g-4">Errors</div>
                                    </div>
                                    {/*AutoComplete*/}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<AutoComplete />'}</div>
                                        <div className="ui-g-2">
                                            <AutoComplete
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.autoCompleteValue}
                                                name="autoCompleteValue"
                                                suggestions={this.state.filteredCountriesSingle}
                                                completeMethod={this.filterCountrySingle}
                                                field="name"
                                                size={15}
                                                placeholder="Countries"
                                                minLength={1} />
                                        </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.autoCompleteValue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.autoCompleteValue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.autoCompleteValue &&
                                                props.touched.autoCompleteValue &&
                                                props.errors.autoCompleteValue}
                                        </div>
                                    </div>

                                    {/*Calendar*/}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<Calendar />'}</div>
                                        <div className="ui-g-2">
                                            <Calendar
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.calendarValue}
                                                name="calendarValue"

                                            />
                                        </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.calendarValue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.calendarValue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.calendarValue &&
                                                props.touched.calendarValue &&
                                                props.errors.calendarValue}
                                        </div>
                                    </div>


                                    {/*Checkbox*/}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<Checkbox />'}</div>
                                        <div className="ui-g-2">
                                            <Checkbox
                                                inputId="cb1"
                                                value="New York"
                                                name="checkboxValues"
                                                onChange={(e) => {
                                                    this.onCityChange(e, props.values, props.values.checkboxValues, props.setValues)
                                                }}
                                                checked={props.values.checkboxValues.includes('New York')}>
                                            </Checkbox>
                                            <label htmlFor="cb1">New York</label>
                                            <Checkbox
                                                inputId="cb2"
                                                value="San Francisco"
                                                name="checkboxValues"
                                                onChange={(e) => {
                                                    this.onCityChange(e, props.values, props.values.checkboxValues, props.setValues)
                                                }}
                                                checked={props.values.checkboxValues.includes('San Francisco')}>
                                            </Checkbox>
                                            <label htmlFor="cb2">San Francisco</label>
                                        </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.checkboxValues)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.checkboxValues}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.checkboxValues &&
                                                props.touched.checkboxValues &&
                                                props.errors.checkboxValues}
                                        </div>
                                    </div>


                                    {/*ColorPicker*/}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<ColorPicker />'}</div>
                                        <div className="ui-g-2">
                                            <ColorPicker
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.colorPickerValue}
                                                name="colorPickerValue" />
                                        </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.colorPickerValue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.colorPickerValue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.colorPickerValue &&
                                                props.touched.colorPickerValue &&
                                                props.errors.colorPickerValue}
                                        </div>
                                    </div>

                                    {/*Chips*/}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<Chips />'}</div>
                                        <div className="ui-g-2">
                                            <Chips
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.chipsValues}
                                                name="chipsValues" />
                                        </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.chipsValues)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.chipsValues}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.chipsValues &&
                                                props.touched.chipsValues &&
                                                props.errors.chipsValues}
                                        </div>
                                    </div>
                                    {/*Dropdown*/}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<Dropdown />'}</div>
                                        <div className="ui-g-2">
                                            <Dropdown
                                                value={props.values.dropdownValue}
                                                dataKey="code"
                                                optionLabel="name"
                                                options={cities}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                style={{ width: '150px' }}
                                                placeholder="Select a City"
                                                name="dropdownValue" />
                                        </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.dropdownValue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.dropdownValue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.dropdownValue &&
                                                props.touched.dropdownValue &&
                                                JSON.stringify(props.errors.dropdownValue)}
                                        </div>
                                    </div>

                                    {/*Editor*/}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<Editor />'}</div>
                                        <div className="ui-g-2">
                                            <Editor
                                                style={{ height: '120px' }}
                                                value={props.values.editorValue}
                                                onTextChange={(e) => {
                                                    props.setValues({ ...props.values, editorValue: e.htmlValue });
                                                }}
                                                onBlur={props.handleBlur}
                                                name="editorValue" />
                                        </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.editorValue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.editorValue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.editorValue &&
                                                props.touched.editorValue &&
                                                props.errors.editorValue}
                                        </div>
                                    </div>

                                    {/*InputMask */}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<InputMask />'}</div>
                                        <div className="ui-g-2">
                                            <InputMask
                                                mask="99-999999"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.inputMaskValue}
                                                name="inputMaskValue" />
                                        </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.inputMaskValue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.inputMaskValue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.inputMaskValue &&
                                                props.touched.inputMaskValue &&
                                                props.errors.inputMaskValue}
                                        </div>
                                    </div>

                                    {/*InputSwitch */}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<InputSwitch />'}</div>
                                        <div className="ui-g-2">
                                            <InputSwitch
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                checked={props.values.inputSwitchValue}
                                                name="inputSwitchValue" />
                                        </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.inputSwitchValue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.inputSwitchValue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.inputSwitchValue &&
                                                props.touched.inputSwitchValue &&
                                                props.errors.inputSwitchValue}
                                        </div>
                                    </div>

                                    {/*InputText*/}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<InputText />'}</div>
                                        <div className="ui-g-2"> <InputText
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.inputTextValue}
                                            name="inputTextValue"
                                        />  </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.inputTextValue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.inputTextValue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.inputTextValue &&
                                                props.touched.inputTextValue &&
                                                props.errors.inputTextValue}
                                        </div>
                                    </div>
                                    {/*InputTextArea */}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<InputTextArea />'}</div>
                                        <div className="ui-g-2"> <InputTextarea
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.inputTextareavalue}
                                            name="inputTextareavalue"
                                            rows={5} cols={5}
                                        />  </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.inputTextareavalue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.inputTextareavalue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.inputTextareavalue &&
                                                props.touched.inputTextareavalue &&
                                                props.errors.inputTextareavalue}
                                        </div>

                                    </div>
                                    {/*ListBox */}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<ListBox />'}</div>
                                        <div className="ui-g-2"> <ListBox
                                            options={cities}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.listBoxValue}
                                            name="listBoxValue"
                                            dataKey="code"
                                            optionLabel="name"
                                        />  </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.listBoxValue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.listBoxValue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.listBoxValue &&
                                                props.touched.listBoxValue &&
                                                JSON.stringify(props.errors.listBoxValue)}
                                        </div>
                                    </div>

                                    {/*MultiSelect */}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<MultiSelect />'}</div>
                                        <div className="ui-g-2"> <MultiSelect
                                            options={cities}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.multiSelectValue}
                                            name="multiSelectValue"
                                            dataKey="code"
                                            optionLabel="name"
                                        />  </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.multiSelectValue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.multiSelectValue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.multiSelectValue &&
                                                props.touched.multiSelectValue &&
                                                JSON.stringify(props.errors.multiSelectValue)}
                                        </div>
                                    </div>

                                    {/*Password */}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<Password />'}</div>
                                        <div className="ui-g-2"> <Password
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.passwordValue}
                                            name="passwordValue"
                                        />  </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.passwordValue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.passwordValue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.passwordValue &&
                                                props.touched.passwordValue &&
                                                JSON.stringify(props.errors.passwordValue)}
                                        </div>


                                    </div>

                                    {/*RadioButton */}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<RadioButton />'}</div>
                                        <div className="ui-g-2">
                                            <RadioButton inputId="rb1"
                                                name="radioButtonValue"
                                                value="New York"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                checked={props.values.radioButtonValue === 'New York'} />
                                            <label htmlFor="rb1">New York</label>
                                            <RadioButton inputId="rb2"
                                                name="radioButtonValue"
                                                value="San Francisco"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                checked={props.values.radioButtonValue === 'San Francisco'} />
                                            <label htmlFor="rb2">San Francisco</label>
                                        </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.radioButtonValue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.radioButtonValue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.radioButtonValue &&
                                                props.touched.radioButtonValue &&
                                                JSON.stringify(props.errors.radioButtonValue)}
                                        </div>
                                    </div>

                                    {/*Rating */}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<Rating />'}</div>
                                        <div className="ui-g-2">
                                            <Rating
                                                name="ratingValue"
                                                value={props.values.ratingValue}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.ratingValue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.ratingValue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.ratingValue &&
                                                props.touched.ratingValue &&
                                                JSON.stringify(props.errors.ratingValue)}
                                        </div>
                                    </div>

                                    {/*SelectButton */}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<SelectButton />'}</div>
                                        <div className="ui-g-2">
                                            <SelectButton
                                                name="selectButtonValue"
                                                value={props.values.selectButtonValue}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                dataKey="code"
                                                optionLabel="name"
                                                options={cities}
                                            />
                                        </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.selectButtonValue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.selectButtonValue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.selectButtonValue &&
                                                props.touched.selectButtonValue &&
                                                JSON.stringify(props.errors.selectButtonValue)}
                                        </div>
                                    </div>


                                    {/*Slider */}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<Slider />'}</div>
                                        <div className="ui-g-2">
                                            <Slider
                                                name="sliderValue"
                                                value={props.values.sliderValue}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.sliderValue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.sliderValue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.sliderValue &&
                                                props.touched.sliderValue &&
                                                JSON.stringify(props.errors.sliderValue)}
                                        </div>
                                    </div>

                                    {/*Spinner */}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<Spinner />'}</div>
                                        <div className="ui-g-2">
                                            <Spinner
                                                name="spinnerValue"
                                                value={props.values.spinnerValue}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.spinnerValue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.spinnerValue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.spinnerValue &&
                                                props.touched.spinnerValue &&
                                                JSON.stringify(props.errors.spinnerValue)}
                                        </div>
                                    </div>
                                    {/*TriStateCheckbox */}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<TriStateCheckbox />'}</div>
                                        <div className="ui-g-2">
                                            <TriStateCheckbox
                                                name="triStateCheckboxValue"
                                                value={props.values.triStateCheckboxValue}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.triStateCheckboxValue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.triStateCheckboxValue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.triStateCheckboxValue &&
                                                props.touched.triStateCheckboxValue &&
                                                JSON.stringify(props.errors.triStateCheckboxValue)}
                                        </div>
                                    </div>

                                    {/*ToggleButton */}
                                    <div className="ui-g">
                                        <div className="ui-g-2">{'<ToggleButton />'}</div>
                                        <div className="ui-g-2">
                                            <ToggleButton
                                                name="toggleButtonValue"
                                                checked={props.values.toggleButtonValue}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>
                                        <div className="ui-g-2">{JSON.stringify(props.values.toggleButtonValue)}</div>
                                        <div className="ui-g-2">{`${!!props.touched.toggleButtonValue}`}</div>
                                        <div className="ui-g-4" style={{ color: 'red' }}>
                                            {props.errors.toggleButtonValue &&
                                                props.touched.toggleButtonValue &&
                                                JSON.stringify(props.errors.toggleButtonValue)}
                                        </div>
                                    </div>


                                    <button type="submit" disabled={props.isSubmitting || !props.dirty}>Submit</button>
                                    <button type="button" onClick={props.handleReset}>Reset</button>
                                </div>
                                <br />
                            </Form>

                        }
                    />
                    {this.state.formValues && <div><h2>Form submitted values are</h2><pre>{JSON.stringify(this.state.formValues)}</pre></div>}
                </div>
                <FormikDoc />
            </div>
        )
    }
}

class FormikDoc extends Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div className="content-section source">
                <TabView>
                    <TabPanel header="Documentation">
                        See <a href="https://github.com/jaredpalmer/formik">Formik documentation</a>
                    </TabPanel>
                    <TabPanel header="Source">
                        <a href="https://github.com/primefaces/primereact/tree/master/src/showcase/formik" className="btn-viewsource" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-github"></i>
                            <span>View on GitHub</span>
                        </a>
                        <CodeHighlight className="language-javascript">
                            {'todo'}
                        </CodeHighlight>
                    </TabPanel>
                </TabView>
            </div>
        )
    }
}
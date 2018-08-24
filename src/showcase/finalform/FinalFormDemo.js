import React, { Component } from 'react';

import { Form, Field } from 'react-final-form'

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


const required = value => {
  if(!value || (typeof value.length == 'number' && value.length == 0)) {
    return "Required";
  }
  return null;
}
const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
];


const AutoCompleteAdapter = ({ input, meta, ...rest}) => (
  <div>
    AutoComplete values are  {JSON.stringify(input.value)}
    <br/>
    <AutoComplete
      {...input}
      suggestions={rest.parent.state.filteredCountriesSingle}
      completeMethod={rest.parent.filterCountrySingle}
      size={15}
      placeholder="Countries"
      field="name"
      minLength={1} />
    {meta.touched ? meta.error : ''}   
  </div>
)


const ChipsAdapter = ({ input, meta, ...rest }) => (
  <div>
    Chips values are  {JSON.stringify(input.value)}
    <Chips
      {...input}
    />
    {meta.touched ? meta.error : ''}   
  </div>
)

const InputSwitchAdapter = ({ input, meta, ...rest }) => (
  <div>
    InputSwitch values are  {JSON.stringify(input.value)}
    <InputSwitch
      {...input}
      checked={input.value}>
    </InputSwitch>
    {meta.touched ? meta.error : ''}   
  </div>
)




export class FinalFormDemo extends Component {


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
                        <h1>Final Form</h1>
                        <p>Build forms in React, without the tears.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                <Form initialValues={initialFormValues}
        onSubmit={(values) => { this.setState({ formValues: values }) }}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} >
              <div>
              <Field
                  name="autoCompleteValue"
                  component={AutoCompleteAdapter}
                  parent={this}
                  validate={required}
                />

                <Field
                  name="chipsValues"
                  component={ChipsAdapter}
                  validate={required}
                />

                <Field
                  name="inputSwitchValue"
                  component={InputSwitchAdapter}
                  validate={required}
                 />
              </div>

            
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                 Submit
              </button>
              <button
                type="button"
                onClick={() => {reset(initialFormValues)}}
                disabled={submitting || pristine}>
                Reset
              </button>
            </div>
          </form>
        )}
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
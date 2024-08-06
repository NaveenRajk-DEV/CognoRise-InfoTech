// Variables
const Ok_btn = document.querySelector('.ok-btn');
const Back_Home = document.querySelector('.Home-btn');
const Age_Input = document.getElementById('Age-Input');
const Weight_Input = document.getElementById('Weight-Input');
const Height_Input = document.getElementById('Height-Input');
const Calculate_btn = document.querySelector('.Calculate-btn');
const BMI_Container = document.querySelector('.BMI-Container');
const Error_Container = document.querySelector('.Error-Container');
const Gender_Container = document.querySelector('.Gender-Container');
const Output_Container = document.querySelector('.Output-Container');
const Result_Container = document.querySelector('.Result-Container > h1');
const Description_Container = document.querySelector('.Description-Container');
// Custom Main Object 
const Main_Object = {
    Gender : '',
    BMI_Value : 0,
    Age_Value : 0,
    Error_Data : '',
    Weight_Value : 0,
    Height_Value : 0,
    BMI_Description : '',
}
// Escape Btn For Re-enter the Data
Ok_btn.addEventListener('click',()=>{
    Error_Container.classList.toggle('hide');
})
// BMI-Calculation
Calculate_btn.addEventListener('click',()=>{
    
    Main_Object.Weight_Value = Weight_Input.value;
    Main_Object.Height_Value = Height_Input.value /100;
    Main_Object.BMI_Value = (Main_Object.Weight_Value/(Main_Object.Height_Value**2)).toFixed(2);
    Main_Object.Age_Value = Age_Input.value;
    if(Weight_Input.value !== '' && Height_Input.value !== '' 
        && Age_Input.value !== '' && Main_Object.Gender !== ''){
            Display_Output();
            // Display Result
            setTimeout(() => {
                BMI_Container.classList.toggle('hide');
                Output_Container.style.visibility = 'visible';
            }, 50);
    }
    else if(Weight_Input.value === '' && Height_Input.value === '' 
        && Age_Input.value === '' && Main_Object.Gender === ''){
            Main_Object.Error_Data = 'Enter All Details';
            Error_Container.classList.toggle('hide');
            Display_Error();
    }
    else if(Age_Input.value === ''){
        Main_Object.Error_Data = 'Enter Age';
        Error_Container.classList.toggle('hide');
        Display_Error();
    }
    else if(Weight_Input.value === ''){
        Main_Object.Error_Data = 'Enter Weight';
        Error_Container.classList.toggle('hide');
        Display_Error();
    }
    else if(Height_Input.value === ''){
        Main_Object.Error_Data = 'Enter Height';
        Error_Container.classList.toggle('hide');
        Display_Error();
    }
    else if(Main_Object.Gender === ''){
        Main_Object.Error_Data = 'Select Gender';
        Display_Error();
        Error_Container.classList.toggle('hide');
    }
});
// Display Home Page
Back_Home.addEventListener('click',()=>{
    setTimeout(() => {
        window.location.reload();
    }, 50);
});
// Styling the Elements
Gender_Container.children[0].addEventListener('click',()=>{
    Main_Object.Gender = 'Male';
    Gender_Container.children[0].style.boxShadow = `inset -5px -5px 12px #ffffffd0,
                                                    inset 5px 5px 10px rgba(0, 0, 0, 0.5)`;
    Gender_Container.children[1].style.boxShadow = `inset 5px 5px 12px #ffffffd0,
                                                    inset -5px -5px 10px rgba(0, 0, 0, 0.5)`;
});
Gender_Container.children[1].addEventListener('click',()=>{
    Main_Object.Gender = 'Female';
    Gender_Container.children[1].style.boxShadow = `inset -5px -5px 12px #ffffffd0,
                                                    inset 5px 5px 10px rgba(0, 0, 0, 0.5)`;
    Gender_Container.children[0].style.boxShadow = `inset 5px 5px 12px #ffffffd0,
                                                    inset -5px -5px 10px rgba(0, 0, 0, 0.5)`;
});
// Display Final Output
function Display_Output(){
    Main_Object.BMI_Value = parseFloat(Main_Object.BMI_Value);
    if(Main_Object.BMI_Value <= 18.5){
        Main_Object.BMI_Description = 'Under Weight';
        Description_Container.children[4].style.color = 'lightcoral';
    }
    else if(Main_Object.BMI_Value > 18.5 && Main_Object.BMI_Value <= 24.9){
        Main_Object.BMI_Description = 'Normal Weight';
        Description_Container.children[4].style.color = 'green';
    }
    else if(Main_Object.BMI_Value >= 25 && Main_Object.BMI_Value <= 29.9){
        Main_Object.BMI_Description = 'Over Weight';
        Description_Container.children[4].style.color = 'indianred';
    }
    else if(Main_Object.BMI_Value >= 30 && Main_Object.BMI_Value <= 34.9){
        Main_Object.BMI_Description = 'Obesity (Class 1)';
        Description_Container.children[4].style.color = 'red';
    }
    else if(Main_Object.BMI_Value >= 35 && Main_Object.BMI_Value <= 39.9){
        Main_Object.BMI_Description = 'Obesity (Class 2)';
        Description_Container.children[4].style.color = 'darkred';
    }
    else if(Main_Object.BMI_Value >= 40){
        Main_Object.BMI_Description = 'Obesity (Class 3)';
        Description_Container.children[4].style.color = 'darkred';

    }
    Result_Container.innerHTML = Main_Object.BMI_Value;
    Description_Container.children[0].innerHTML = `${Main_Object.Weight_Value} KG`;
    Description_Container.children[1].innerHTML = `${Main_Object.Height_Value} M`;
    Description_Container.children[2].innerHTML = `${Main_Object.Age_Value} Years Old`;
    Description_Container.children[3].innerHTML = `${Main_Object.Gender}`;
    Description_Container.children[4].innerHTML = Main_Object.BMI_Description;
}
// Display Any Error Occurred (Inadequate Data)
function Display_Error(){
    Error_Container.children[1].innerHTML = `${Main_Object.Error_Data}`;
}CognoRise_InfoTech_Task3
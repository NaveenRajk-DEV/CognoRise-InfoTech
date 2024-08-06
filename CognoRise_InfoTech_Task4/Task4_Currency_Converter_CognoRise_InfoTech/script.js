// Variable 
const Swap_btn = document.querySelector('#Swap-btn');
const Submit_btn = document.querySelector('.Sumbit-btn');
const Input_field = document.getElementById('Value-Input');
const To_DropDown = document.getElementById('To-DropDown');
const From_DropDown = document.getElementById('From-DropDown');
const Result_Container = document.querySelector('footer > span');
// Custom Main Object for work and evaluation...
const Main_Object = {
    Input_Value : 0,
    To_Currency : '',
    From_Currency : '',
    Rates_obj : [],
    Currency_obj : [],
    Result : ``,
}
// clear the screen and data...
function Clear_btn(){
    window.location.reload();
}
// Getting Data exchange rate of currencies based on the requests...
async function Get_Rates(){
    try {
        const Url_Response = await fetch(`https://api.frankfurter.app/latest?amount=${Main_Object.Input_Value}&from=${Main_Object.From_Currency}&to=${Main_Object.To_Currency}`);
        if(!Url_Response.ok){
            throw new Error("!Error Occurred by fetching the Rates.")
        }
        let Data_Response = Url_Response.json();
        Data_Response.then(Data => {
            Main_Object.Rates_obj = Object.entries(Data.rates);
            Main_Object.Result = `${Data.amount} ${Main_Object.From_Currency} ==> ${Main_Object.Rates_obj[0][1]} ${Main_Object.To_Currency}`;
            Result_Container.innerHTML = Main_Object.Result;
        });
    } catch (error) {
        console.error(error);   
    }
}
// Getting Data diffrent Currencie's Name and abbreviations of currencies for displaying to the dropdowns
Get_Currencies();
async function Get_Currencies(){
    try {
        // endpoint (/currencies)
        const Url_Response = await fetch(`https://api.frankfurter.app/currencies`);
        if(!Url_Response.ok){
            throw new Error("!Error Occurred by fetching the Currencies.")
        }
        let Data_Response = Url_Response.json()
        Data_Response.then(Data =>{
            Main_Object.Currency_obj = Object.entries(Data);
            for (const iterator of Main_Object.Currency_obj) {
                const To_Options = document.createElement('option');
                const From_Options = document.createElement('option');
                To_Options.value = iterator[0];
                From_Options.value = iterator[0];
                To_Options.innerText = iterator[0];
                From_Options.innerText = iterator[0];
                To_DropDown.appendChild(To_Options);
                From_DropDown.appendChild(From_Options);
            }
        });
    } catch (error) {
        console.error(error);
    }
}
// This button for Evaluation
Submit_btn.addEventListener('click',()=>{
    Main_Object.Input_Value = Input_field.value;
    Get_Rates();
});
// From DropDown
From_DropDown.addEventListener('change',(event)=>{
    Main_Object.From_Currency = event.target.value;
});
// To DropDown
To_DropDown.addEventListener('change',(event)=>{
    Main_Object.To_Currency = event.target.value;
});
// Swap the Currencies each other 
Swap_btn.addEventListener('click',()=>{
    From_DropDown.value = Main_Object.To_Currency;
    To_DropDown.value = Main_Object.From_Currency;
    Main_Object.From_Currency = From_DropDown.value;
    Main_Object.To_Currency = To_DropDown.value;
});
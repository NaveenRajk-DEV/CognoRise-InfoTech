const Btns = [...document.querySelectorAll('.btns')];
const Input_Field = document.getElementById('Input-Field');
const Calculator_Container = document.querySelector('.Calculator-Container');
// 
const Main_Object = {
    Input_Value : '',
    Output : 0,
    Input_Number : 0,
    First_Number : 0,
    Second_Number : 0,
    Number_Array : [],
    Operation_Array : [],
    Text_Show : '',
}
// 
function Mode_Change(){
    Calculator_Container.classList.toggle('Light-Mode');
    if(Calculator_Container.classList[1] === 'Light-Mode'){
        Btns.forEach((elements) =>{
            elements.style.border = '4px solid rgba(0, 0, 0, 0.6)';
            elements.style.backgroundColor = 'rgba(210, 210, 215, 0.8)';
            elements.style.boxShadow = `0 0 4px #000000ef, 
                                        inset -2px -2px 4px #000000ef,
                                        inset 2px 2px 4px rgba(210, 210, 215, 0.8)`;
        });
    }
    else{
        Btns.forEach((elements) =>{
            elements.style.border = '4px solid #0ef';
            elements.style.backgroundColor = 'gray';
            elements.style.boxShadow = `0 0 12px #0ef, 
                                        inset -2px -2px 4px #000000ef,
                                        inset 2px 2px 4px rgba(210, 210, 215, 0.8)`;
        });

    }
}
// 
function Btn_Click(Value){
    if(Value !== 'C' && Value !== '=' && Value !== 'Del'){
        if(Number(Value)){
            Main_Object.Text_Show += Value;
        }
        else{
            Main_Object.Text_Show += ' ' + Value + ' ';
        }
    }
    Input_Field.value = Main_Object.Text_Show;
    if(Number(Value) || Value === '00' || Value === '0' || Value === '.'){
        Main_Object.Input_Value += Value;
        Main_Object.Input_Number = Number(Main_Object.Input_Value);    
    }
    else{
        Main_Object.Input_Value = '';
        Main_Object.Operation_Array.push(Value);
        Main_Object.Number_Array.push(Main_Object.Input_Number);
        Main_Object.Number_Array.forEach((Nums,index)=>{
            if(Nums === 0){
                Main_Object.Number_Array.splice(index,1);
            }
        });
        Main_Object.Operation_Array.forEach((Symbol,index)=>{
            if(Symbol === '=' || Symbol === 'C' || Symbol === 'Del'){
                Main_Object.Operation_Array.splice(index,1);
            }
        });
        if(Value === 'C' || Value === 'Del'){
            Input_Field.value = '';
            Main_Object.Text_Show = '';
            Main_Object.Number_Array = [];
            Main_Object.Operation_Array = [];
        }
        Main_Object.Input_Number = 0;
        if(Value === '='){
            Eval_Multiply_Division();
        }
    }
}
function Eval_Multiply_Division(){
    Main_Object.Operation_Array.forEach((Symbols,index)=>{
        if(Symbols === '/'){
            Main_Object.First_Number = Main_Object.Number_Array[index];
            Main_Object.Second_Number = Main_Object.Number_Array[(index+1)];
            Main_Object.Output = Main_Object.First_Number / Main_Object.Second_Number;
            Main_Object.Number_Array.splice(index,2,Main_Object.Output);
            Main_Object.Operation_Array.splice(index,1);
            Eval_Multiply_Division();
            Display_Output();
        }
        else if(Symbols === '*'){
            Main_Object.First_Number = Main_Object.Number_Array[index];
            Main_Object.Second_Number = Main_Object.Number_Array[(index+1)];
            Main_Object.Output = Main_Object.First_Number * Main_Object.Second_Number;
            Main_Object.Number_Array.splice(index, 2, Main_Object.Output);
            Main_Object.Operation_Array.splice(index,1);
            Eval_Multiply_Division();
            Display_Output();
        }
        else if(Symbols === '%'){
            Main_Object.First_Number = Main_Object.Number_Array[index];
            Main_Object.Second_Number = Main_Object.Number_Array[(index+1)];
            Main_Object.Output = (Main_Object.Second_Number / 100)*Main_Object.First_Number;
            Main_Object.Number_Array.splice(index, 2, Main_Object.Output);
            Main_Object.Operation_Array.splice(index,1);
            Eval_Multiply_Division();
            Display_Output();
        }
        else if(!Main_Object.Operation_Array.includes('/') && !Main_Object.Operation_Array.includes('*')){
            Eval_Add_Sub();
        }
    })
}
function Eval_Add_Sub(){
    Main_Object.First_Number = Main_Object.Number_Array[0];
    Main_Object.Second_Number = Main_Object.Number_Array[1];
    if(Main_Object.Operation_Array[0] === '+'){
        Main_Object.Output = Main_Object.First_Number + Main_Object.Second_Number;
        Main_Object.Number_Array.shift();
        Main_Object.Number_Array.shift();
        Main_Object.Operation_Array.shift();
        Main_Object.Number_Array.unshift(Main_Object.Output);
    }
    else if(Main_Object.Operation_Array[0] === '-'){
        Main_Object.Output = Main_Object.First_Number - Main_Object.Second_Number;
        Main_Object.Number_Array.shift();
        Main_Object.Number_Array.shift();
        Main_Object.Operation_Array.shift();
        Main_Object.Number_Array.unshift(Main_Object.Output);
    }
    if(Main_Object.Number_Array.length > 1){
        Eval_Add_Sub();
    }
    if(Main_Object.Number_Array.length === 1){
        Display_Output();
    }
}
function Display_Output(){
    Input_Field.value = Main_Object.Output.toFixed(2);
    if(!Main_Object.Output && Main_Object.Output !== 0){
        Input_Field.value = 'Enter Valid Data';
    }
}
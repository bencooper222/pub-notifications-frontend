import { isButtonEnableable } from './main.rs';

const orderField = document.getElementById('order'),
  phoneField = document.getElementById('phone'),
  passcodeField = document.getElementById('passcode');

const enableSubmit = () => {
  console.log('event fired');
  document.getElementById('submit').disabled = !isButtonEnableable(
    orderField.value,
    phoneField.value,
    passcodeField.value,
  );
};

orderField.oninput = enableSubmit;
phoneField.oninput = enableSubmit;
passcodeField.oninput = enableSubmit;

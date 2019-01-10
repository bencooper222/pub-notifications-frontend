#[no_mangle]

// pub fn submitForm() -> u32 {

// }

pub fn isButtonEnableable(orderNum: String, phone: String, passcode: String) -> bool {
//  let splitNum: Vec<&str> = orderNum.split("").collect();
println!("{}",orderNum);
if orderNum == "2" {
   return true
}
return false
}

// pub fn retrieveStoredNumber -> String {

// }
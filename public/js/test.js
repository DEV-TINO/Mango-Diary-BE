async function onSubmit(event) {
  event.preventDefault();
  console.log('Form submitted');
  console.log(event.target);
  console.log(event.target.action)
  console.log(event.target.method.toUpperCase())

  const formData = new FormData(event.target); // 폼 데이터를 준비합니다.
  const myRequest = {}

  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
    myRequest[key] = value
  }

  try {
    const result = await axios.post(event.target.action, myRequest)
    
    console.log(result.data)
    const data = result.data
    console.log('Success: ', data);
    const dataString = JSON.stringify(data, 4);
    document.getElementById('result').innerHTML = '성공: ' + dataString; // 응답을 화면에 표시합니다.

  } catch (error) {
    console.log('Error: ', error)
    const errorString = JSON.stringify(error, 4);
    document.getElementById('result').innerHTML = '오류: ' + errorString; // 오류를 화면에 표시합니다.
  }
}

window.onload = () => {
  console.log('Window loaded');
  document.querySelectorAll('form').forEach((form) => {
    console.log('Form found');
    form.addEventListener('submit', onSubmit);
  })
}

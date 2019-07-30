const createID = document.getElementById('createID');
const noteID = document.getElementById('noteID');
const identification = document.getElementById('identification');
const inputID = document.getElementById('inputNewID');
const inputNewPwd = document.getElementById('inputNewPwd');

createID.addEventListener('click', async (event) => {
    const id = document.getElementById('inputNewID').value;
    const pwd = document.getElementById('inputNewPwd').value;
    console.log(id);
    const response = await fetch('/users/signUp', {
        method: 'POST',
        body: JSON.stringify({ id, pwd }),
        headers: { "Content-Type": "application/json" }
    })
})

// ID를 입력했을 때, 정규식을 이용해 입력된 아이디가 유효한지 검사하여 표시하는 이벤트
inputID.addEventListener('keyup', (event) => {
    idToCheck = inputID.value;
    inputID.dataset.possible = "no";
    if (!/^[a-z0-9+]{4,12}$/.test(idToCheck) || / /.test(idToCheck)) {
        return noteID.innerHTML = '공백없이 영소문자와 숫자로만 조합된 4~12글자 사이의 ID만 가능합니다.';
    }
    if (!/[a-z]/.test(idToCheck)) {
        return noteID.innerHTML = '영어(소문자)를 포함시켜 주세요.';
    }
    if (!/[0-9]/.test(idToCheck)) {
        return noteID.innerHTML = '숫자를  포함시켜 주세요.'
    }
    inputID.dataset.possible = "yet";
    return noteID.innerHTML = 'ID중복검사를 해주세요.'
})

// ID중복확인버튼 클릭시 서버와 통신하여 중복체크까지하여 표시하는 이벤트
identification.addEventListener('click', async (event) => {
    if (inputID.dataset.possible !== "yet") return;
    const idToCheck = inputID.value;
    try {
        const response = await fetch('/users/identification', {
            method: 'POST',
            body: JSON.stringify({ id: idToCheck }),
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.text();
        if (data === 'no') {
            noteID.innerHTML = '이미 사용중인 ID입니다.';
        } else {
            inputID.dataset.possible = "yes";
            noteID.innerHTML = '사용가능한 ID입니다.';
        }
    } catch (err) {
        throw err;
    }
})

inputNewPwd.addEventListener('keyup', (event) => {
    const pwdToCheck = inputNewPwd.value;
    if (pwdToCheck.length < 8) {

    }
})

/*
clickCreateID() {
    this.createID.addEventListener('click', async (e) => {
        const passwordToUse = document.getElementById('passwordToUse').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (this.ischeckedID()) {
            if (passwordToUse.length < 8) {
                const text = '비밀번호는 최소 8자리 이상 입력해주세요';
                this.showNote(text, 1500);
            } else {
                if (passwordToUse !== confirmPassword) {
                    const text = '비밀번호가 일치하지 않습니다.';
                    this.showNote(text, 1500);
                } else {
                    const idAndPwd = 'id=' + this.userNameToUse.value + '&pwd=' + passwordToUse;
                    const response = await fetch('/createID', {
                        method: 'POST',
                        body: idAndPwd
                    })
                    const data = await response.text();
                    if (data === 'create') {
                        this.changeLoginWindow();
                        const text = '아이디가 생성되었습니다.';
                        this.showNote(text, 1500);
                    } else {
                        const text = '실패';
                        this.showNote(text, 1500);
                    }
                }
            }
        } else {
            const text = '아이디 중복체크를 해주세요.';
            this.showNote(text, 1500);
        }
    })
}
*/
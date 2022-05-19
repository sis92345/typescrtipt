/**
 * 첫번쩨 타입스크립트
 *
 * 목표 : 타입 스크립트 타입 오류를 살펴본다.
 * 테스트 방법
 *  1. 선언된 변수로 계산식을 자유롭게 생성
 *  2. 생성되는 오류를 확인
 * */

let a = 1 + 2;
let b = 1 + a;
let c = {
    apple : {
        type : "fruit",
        name : "apple",
        num  : 1
    },
    banana : b,
}
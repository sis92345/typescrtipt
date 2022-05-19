/**
 * 타입 스크립트의 타입을 살펴본다.
 *
 * 목표 : 타입스크립트의 타입을 파악한다.
 * */

/** any */
// 타입 스크립트의 파라메터 선언 : 파라메터 : 타입 어노테이션 ex ) n :  number
function squareOf( n : number ){
    return n * n;
}

// 올바른 타입
let result = squareOf( 2 );
// 올바르지 않은 타입 : TS2345: Argument of type 'string' is not assignable to parameter of type '
//let result2 = squareOf( "23" );
console.log( result );

/** unknown */
console.log( "===========Unknown==========" );
let unknownValue : unknown; // unknown
unknownValue = true; // unknown에 모든 타입을 선언할 수 있다.
let unknownValuePre = a === 100; // unknownValuePre는 boolean 하지만 unknownValue의 값을 아직 평가할 수 없음
// let newUnknownValue : boolean = unknownValue; //TS2322: Type 'unknown' is not assignable to type 'boolean'.
// let unknownCal = unknownValue + 10; // TS2571: Object is of type 'unknown'.
if ( typeof unknownValue === "number"  ){
    const unknownValueCal2 = unknownValue + 200;
}

/** boolean */
let booleanTrue = true; // let booleanTrue: boolean
let booleanFalse = false; // let booleanTrue: boolean
const booleanConst = true; // const booleanConst: true
let booleanType : boolean = true; // let booleanType: boolean
let booleanTrueExplict : true = true; // let booleanTrueExplict: true
// let booleanTrueExplictError : true = false; //TS2322: Type 'false' is not assignable to type 'true'.

/** number */
let numberImp = 10; // let numberImp: number
const numberImpVal = 10; // const numberImpVal: 10
let numberExp : number = 10; // let numberExp: number
let numberExpVal : 10 = 10; // let numberExpVal: 10

/** String */
let str : string = "I'm String";
/**
 * Typescipt Array 타입
 * @desc 타입스크립트의 배열은 모든 항목이 같은 타입을 갖도록 설계해야 한다.
 * */

// 1. 암시적으로 선언해서 타입스크립트에게 추론하는 방식 :
let arrayImp = [ "3" ];                        //  string[]
const arrayImpNumWithString = [ '3' , 2 ];     //  (string | number)[]

// 2. 암시적으로 특정 값으로 선언했음을 타입스크립트에게 추론하는 방식
const arrayConst = [{ "3" : "3" }]; // {"3": string}[]

// 3. 명시적으로 number 타입을 선언 : bigintExp
let arrayExp : string[] = [ '안녕' ];
let arrayExpStrWitBoolean : ( string | boolean )[] = [true, "string"];

// 4. 명시적으로 number의 값을 선언해서 특정 값으로 제한 : bigintExpVal
const arrayExpConst : string[] =  [ 'red' ];

/** 배열을 선언하는 다양한 문법 */

let as : readonly string[];
let ab : Array<string>;
let ac : Readonly<string>;
let ad : Array<string[]>;
let ae : [string|number][];

/** 배열의 특별한 예 */

// 1. 빈 배열을 암시적으로 선언할 경우 any 타입으로 추론된다.
let whatIsMyTypeArr = [];  // any[]

// 2. 빈 배열에 값을 넣을 경우 넣어진 값을 바탕으로 값을 배열 타입을 다시 추론한다.
whatIsMyTypeArr.push( true );

// 3. 배열이 정의된 렉시컬 환경 이외로 벗어난다면 최종적으로 그 떼 최종 타입을 허용한다.
function returnStringArr () {
    let strConst = [];
    strConst.push( "1st" );
    return strConst;
}

let whatIsType = returnStringArr();

// 트랜스 파일 단계에서 오류가 발생한다. returnStringArr의 실행 컨텍스트에서 정의되어 반환된 배열은 최종적으로 string[]의 타입을 갖는다.
//whatIsType.push( true );

/** TS 오류 */

/**
 * boolean 타입 인수를 string | number 타입의 매개변수에 할당할 수 없음
 * @error TS2345: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
 * @code let imNotBigint : bigint = 30000;
 * <pre>
 *    let array : ( string | number )[] = [];
 *    array.push( "red" );
 *    array.push( 1 );
 *    array.push( true );
 * </pre>
 * */

/**
 * 빈 배열의 경우 정의된 렉시컬 환경 렉시컬 환경을 벗어나면 배열을 확장할 수 없도록 타입을 확정한다.
 *
 * @error  TS2345: Argument of type 'boolean' is not assignable to parameter of type 'string'.
 * @code
 * <pre>
 * function returnStringArr () {
 *     let strConst = [];
 *     strConst.push( "1st" );
 *     return strConst;
 * }
 *
 * let whatIsType = returnStringArr();
 *
 * // 트랜스 파일 단계에서 오류가 발생한다. returnStringArr의 실행 컨텍스트에서 정의되어 반환된 배열은 최종적으로 string[]의 타입을 갖는다.
 * whatIsType.push( true );
 * </pre>
 * */
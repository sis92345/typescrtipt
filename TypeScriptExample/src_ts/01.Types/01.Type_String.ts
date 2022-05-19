/**
 * Typescript string 타입
 *
 * @desc 타입스크립트의 string 타입, String이 아님을 유의
 * */

/** 선언 방법 */

// 1. 명시적 추론
const stringImp = "string";

// 2. const를 이용한 값이 특정 string임을 알 수 있도록 추론
const stringConst = "constString";

// 3. 명시적으로 string 타입임을 알 수 있도록 선언
let stringExp : String = "string";

// 4. 명시적으로 string이 특정 값으로 선언
let stringExpVal : "stringVal" = "stringVal";

console.log( stringExpVal );
/** 오류 */

/**
 * 다른 타입을 선언
 *
 * @error TS2322: Type 'number' is not assignable to type 'string'
 * @code
 *  <pre>
 * let isString = "YES!";
 * isString = 1;
 *  </pre>
 * */

/**
 * 특정 값으로 선언된 string 타입에 다른 string을 할당
 *
 * @error TS2322: Type '"noImNumber"' is not assignable to type '"imString"'.
 * @code let imString : "imString" = "noImNumber";
 * */

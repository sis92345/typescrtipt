/**
 * Typescipt bigint 타입
 * @desc number타입 보다 더 많은 수를 표현하기 위해서 사용한다.
 * */

// 1. 암시적으로 선언해서 타입스크립트에게 추론하는 방식 : binintImp
let binintImp = 300000000n;

// 2. 암시적으로 특정 값으로 선언했음을 타입스크립트에게 추론하는 방식. : const bigintConst : 300000000n
const bigintConst = 300000000n;
// 3. 명시적으로 number 타입을 선언 : bigintExp
let bigintExp : bigint = 30000n;

// 4. 명시적으로 number의 값을 선언해서 특정 값으로 제한 : bigintExpVal
let bigintExpVal : 30000n;

/** TS 오류 */

/**
 * bigint 타입에 number를 할당할 수 없습니다.
 * @error TS2322: Type 'number' is not assignable to type 'bigint'.
 * @code let imNotBigint : bigint = 30000;
 * */
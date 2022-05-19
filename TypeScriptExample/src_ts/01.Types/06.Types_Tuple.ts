/**
 * Typescipt Tuple 타입
 * @desc 배열의 서브 타입으로 길이 고정, 각 인덱스의 타입을 명시해야 하는 타입이다. 배열 타입을 선언하는 문법과 같기 때문에 반드시 원하는 인덱스의 타입을 선언해야 한다.
 * */
import {throws} from "assert";

// 1. 튜플은 반드시 명시적으로 선언해야 한다.

let tuple : [string , number] = [ "Mark" , 1 ];
let tuple2 : [string , number, boolean] = [ "Mark" , 1, true ];

// 2. 튜플은 스프레드 문법을 사용하여 퓨틀의 최소 길이를 갖도록 선언할 수 있다.

// string, bolean값을 1,2 번째 인덱스로 가지는 배열을 생성하기를 원할 때 유용하다.
let spreadTuple : [string, number , ...string[]] = [ "Ann" , 1 , "YES" , "RED" ]

spreadTuple.push( "HELLO" );

// 최종 타입 : 'string | number' ->  TS2345: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
// spreadTuple.push( true );

/** 배열의 옵션 */

// 객체 생성시와 마찬가지로 배열또한 readonly와 선택형 옵션을 사용할 수 있다.

// 1. 선택형 : T? -> T타입은 포함할 수 있음
let optionalNumArr : [string, number?] = [ 'PUSH' ];


// 2. READONLY 옵션 : 한번 배열을 만든 후 변경할 수 없는 불변 배열을 만들기 위해 사용한다.
const readOnlyArr : readonly number[] = [ 1, 2, 3 ];
const copyArr = readOnlyArr.slice();
copyArr.push( 5 );
//
// readOnlyArr.push( 1 );

const voidFunction = () => {};

const neverFunction = () => {

    while (true) {
       console.log( "!" );
    }
}
/** TS 오류 */

/**
 * 선언한 배열 타입으로 할당하지 않았을 경우 : 아래 코드는 string, number?를 받는 tuple이지만 빈 배열을 받았을 경우 이다.
 *
 * @error Type '[]' is not assignable to type '[string, number?]'. Source has 0 element(s) but target requires 1.
 * @code const myArr : [string, number?] = [];
 * */

/**
 *  readonly으로 선언후 값을 할당한 배열에 값 조작 시도시 오류
 *
 * @error  TS2339: Property 'push' does not exist on type 'readonly number[]'.
 * @code
 * <pre>
 * const readOnlyArr : readonly number[] = [ 1, 2, 3 ];
 * readOnlyArr.push( 1 );
 * </pre>
 * */
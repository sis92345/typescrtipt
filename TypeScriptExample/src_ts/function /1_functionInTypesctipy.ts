/**
 * 타입스크립트에서의 함수
 * */

/** 1. 타입스크립트에서 함수를 선언하는 가장 기본적인 방법*/

const adder = function ( a : number, b : number ) : number {
    return a + b;
}

// 이름을 붙여서 선언
function minus( a : number , b : number ) {
    return a - b;
}

// 함수 표현식
const multiple = function ( a : number , b : number ) : number {
    return a * b;
}

// 화살표 함수 표현식
const greeting1 = ( name : { name : string, greeting : string } ) : void => { console.log( name.name + name.greeting ) }

// 단축형 화살표 함수 표현식
const greeting2 = ( name : string ) => "hello" + name;

type showMessage = ( message : string , userId? : string ) => void;
// 필수 매개변수와 기본 매개변수
const showMessage : showMessage = function ( message : string, userId? : string ) : void {

    const sender = userId ? userId : "익명";

    console.log( "====================" );
    console.log( message );
    console.log( "====================" );
    console.log( "- " + sender + " -" );
}

const showMessageWithDefault : showMessage = function ( message : string, userId = "익명") : void {

    console.log( "====================" );
    console.log( message );
    console.log( "====================" );
    console.log( "- " + userId + " -" );
}

const showMessageWithContextual : showMessage = ( message , userId = "익명" ) => {

    console.log( "====================" );
    console.log( message );
    console.log( "====================" );
    console.log( "- " + userId + " -" );
}

// 나머지 매개변수
const showMessageAll = function (  messageDisplay : Function , ...messages : string[] ) {

    messages.forEach( message => { messageDisplay( message ) });
}

// 제너레이터 함수
// 0. 제너레이터 함수는 *을 붙여서 표현한다. 제너레이터를 호출하면 이터러블 반복자가 반환된다.
function* generator() {
    let a = 0;
    let b = 1;

    // 1. 소비자가 값을 호출하면 yield로 값을 호출한 후 소비자 요청 전까지 실행을 중지한다.
    while (true) {
        yield a; // 2. 제너레이터에서 yield 키워드로 값을 방출한다.
        [a, b] = [b, a + b];
    }
}

// 함수 시그니처
const showMessageAllWithSigniture = function (  messageDisplay : showMessage , ...messages : string[] ) {

    messages.forEach( message => { messageDisplay( message ) });
}



console.log( "나의 첫번째 타입스크립트 함수 " , adder( 1 , 2 ) );
console.log( "빼기 " , minus( 1 , 2 ) );
console.log( "곱하기" , multiple( 1 , 2 ) );
greeting1( { name : "an" , greeting : " hello" } );
console.log( greeting2( "kim" ) )
showMessage( "옵션 값이 없습니다." );
showMessage( "옵션 값이 없습니다." , "김진표" );
showMessageAll( showMessage , "안녕" , "Hello" , "곤니치와" );
showMessageAllWithSigniture( showMessageWithDefault , "도쿄" , "런던" , "파리" );
showMessageAllWithSigniture( showMessageWithContextual , "도쿄" , "런던" , "파리" );

const fibonacci = generator();
fibonacci.next();
fibonacci.next();
fibonacci.next();
console.log( fibonacci.next() );
/** 오류 모음 */

/**
 * 반환타입이 명시적으로 선언되어 있을 경우 반드시 해탕 타입으로 반환이 되어야 한다.
 *
 * @error : TS2355: A function whose declared type is neither 'void' nor 'any' must return a value.
 * @code
 * <pre>
 *     const adder = function ( a : number, b : number ) : number {
 *
 *     }
 * </pre>
 * */

/**
 * 인수를 전달하지 않거나 잘못된 타입을 전달하면 오류 발생
 *
 * @error TS2322: Type 'number' is not assignable to type 'string'.  1_functionInTypesctipy.ts(22, 30): The expected type comes from property 'name' which is declared here on type '{ name: string; greeting: string; }'
 * @code
 * <pre>
 *     // 화살표 함수 표현식
 *     const greeting1 = ( name : { name : string, greeting : string } ) : void => { console.log( name.name + name.greeting ) }
 *     greeting1( { name : 3333 , greeting : " hello" } );
 * </pre>
 * */

/**
 * 파라메터를 암시적으로 선언할 수 없습니다.
 *
 * @error TS7006: Parameter 'exp' implicitly has an 'any' type.
 * @code
 * <pre>
 *      const exp = (exp) => exp;
 * </pre>
 * */
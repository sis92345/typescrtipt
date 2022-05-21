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


// 오버로드
type showMessageOverload = {
    ( message : string ) : void
    ( message : string , userId : string ) : void
}

const showMessageByUserid : showMessageOverload  = function ( message : string, userIdOrVoid : string | void  = "익명") : void {

    // userId 있을 시 구현
    if ( typeof userIdOrVoid === "undefined") {
        showMessageWithContextual( message );
    }
    else {
        showMessageWithContextual( message , userIdOrVoid );
    }
    // userId 없을 시 구현
}

/** 다형성 */

// 1. 제너릭을 사용하지 않은 형태 : 이 경우 객체로 넘길경우 object이기 때문에 받을수는 있지만 프로퍼티 접근이 불가능함
type FilterWithNotGeneric = {
    (array : number[], f: (item:number) => boolean )  : number[] ,
    (array : string[], f: (item:string) => boolean )  : string[] ,
    (array : object[], f: (item:object) => boolean )  : object[] ,
}

const func1 : FilterWithNotGeneric = function ( array : any[] , f: ( _ : any) => boolean) {

    return array;
}

func1( [ "an" , "doc" ] , _ => _ === "an" )


// 2. 제너릭을 사용한 함수 시그니쳐 정의
// 제너릭 : 함수나 클래스 내부가 아닌 외부 사용자에 의해 타입이 지정되는 것, 즉 선언 시점이 아닌 사용 시점에 타입이 지정된다.
// 제너릭을 사용할 경우 ()앞에 <T>를 붙인다.

type FilterWithGeneric = {
    <T>( array : T[] , f : ( item : T ) => boolean ) : T[]
}

// <?>의 위치마다 제너릭의 타입 한정 위치가 달라진다.
type FilterWithGenericTypeAlias<T>= ( array : T[] , f : ( item : T ) => boolean ) => T[]

// 함수 정의시에도 사용할 수 있다.
function map<T,U>( array : T[] , f : ( item : T ) => U ) : U[] {

    let result = [];

    for ( let i = 0; i < array.length ; i++ ) {

        result[i] = f(array[i]);
    }

    return result;
}

const filterFunction : FilterWithGeneric = function ( array  , func ) {

    let result = [];

    for ( let i = 0; i < array.length ; i++ ) {

        const item = array[i];

        if ( func(item) ) {
            result.push(item);
        }
    }

    return result;
}

const filterFunctionWithGenericTypeAlise : FilterWithGenericTypeAlias<number> = function ( array , func ) {

    let result = [];

    for ( let i = 0; i < array.length ; i++ ) {

        const item = array[i];

        if ( func(item) ) {
            result.push(item);
        }
    }

    return result;
}

/** 다형성 */
type user = {
    userId : string,
    showMe : () => void,
}
type staffUser = user & {
    personalNo : string

}

type normalUser = user & {
    googleId : string
}

type property = {
    properties : string[],
    showProperty : ( item : string ) => void
}

const user1 : user & property = {
    userId : "1",
    showMe : () => {console.log( "나는 유저!" )},
    properties: [ "서울" ],
    showProperty : ( pro ) => { console.log( pro ) }
}
const user2 : staffUser & property = {
    userId : "2",
    personalNo: "",
    showMe() { console.log( "나는 스테프 유저!" ) },
    properties: [ "대구" ],
    showProperty : ( pro ) => { console.log( pro ) }
}

const user3 : normalUser & property = {
    userId : "1",
    googleId : "12",
    showMe() { console.log( "나는 스테프 유저!" ); },
    properties: [ "부산" ],
    showProperty : ( pro ) => { console.log( pro ) }
}

/** VOID 처리! */
// void 함수에 return은 자유롭게 할 수 있지만, void 람수로 값을 받은 변수는 void 타입이 되므로 사용할 수 없다.
type test2 = ( item : string ) => void;

const abcd : test2 = ( item ) => 1;

console.log( "+++++++++++++ TYPE!" )
const isVoid = abcd( "1" );

// TS2365: Operator '+' cannot be applied to types 'void' and 'number'.
// isVoid + 3;
console.log( isVoid )
// 일반 타입은 안됨 : T 제너릭이 객체일 경우 어떤 타입이 올지 모르니까 오류
// function showId <T> ( user : T ) : void {
//     console.log( user.userId )
// }

// user를 상속받는 모든 타입을 받을 수 았다.

function showId<T extends user > ( user : T ) : void {
    user.showMe();
}

function showIdWithProperty <T extends user & property > ( user : T ) : void {
    user.showMe();
    user.showProperty( user.properties[0] );
}



console.log( "나의 첫번째 타입스크립트 함수 " , adder( 1 , 2 ) );
console.log( "빼기 " , minus( 1 , 2 ) );
console.log( "곱하기" , multiple( 1 , 2 ) );
greeting1( { name : "an" , greeting : " hello" } );
console.log( greeting2( "kim" ) )
showMessage( "옵션 값이 없습니다." );
showMessage( "옵션 값이 없습니다." , "김진표" );

// 함수 시그니쳐 정의
showMessageAll( showMessage , "안녕" , "Hello" , "곤니치와" );
showMessageAllWithSigniture( showMessageWithDefault , "도쿄" , "런던" , "파리" );
showMessageAllWithSigniture( showMessageWithContextual , "도쿄" , "런던" , "파리" );

// 오버로드
showMessageByUserid( "안녕" )
showMessageByUserid( "안녕" , "김땡땡" )

// 제너레이터 함수
const fibonacci = generator();
fibonacci.next();
fibonacci.next();
fibonacci.next();
console.log( fibonacci.next() );

console.log( filterFunction( [ {name : "an"} , {name : "kim"} ] , _ => _.name === "an" ) );
console.log( filterFunctionWithGenericTypeAlise( [ 1 , 2 , 3 , 4 , 5 ] , _ => _ >= 3) );

const mapResult = map( [ 1 , 2 ,3 ] , _ => { return _ + 3 } ); // <number,number>
const mapResult2 = map<number , string>( [ 1 , 2 ,3 ] , _ => { return _ + "3" } ); // <number,string>

showIdWithProperty( user1 );
showIdWithProperty( user2 );
showIdWithProperty( user3 );

// 덕타이핑
showId( { userId : "해킹 유저", showMe : () => {console.log( "나는 오리" )} } )

// 제너릭은 제너릭 위치에 기초하여 적절한 구체 타입을 한정한다. 아래는 T[]를 string[]으로 한정하였으므로
// Property 'name' does not exist on type 'string'.오류가 발생한다.
//console.log( filterFunction( [ "an" , "doc" ] , _ => _.name === "an" ) );
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
/** 객체 */
// 자바스크립트는 동적 언어이기 때문에 객체에 property를 추가하는 것이 자유롭습니다.
var objNormal = {};
// objNormal[ "newProperty" ] = "NEW!!";
// 하지만 타입스크립트에 object type으로 선언할 경우 위 방법으로 자유롭게 프로퍼티를 추가할 수 없습니다.
var objType = {};
// objType.newProperty = "NEW!"; // TS2339: Property 'newProperty' does not exist on type 'object'
// 따라서 이번 문서에서는 타입스크립트에서 기본적으로 객체를 선언하는 방법을 알아봅니다.
// 1. any 타입으로 객체를 선언할 경우 바닐라 스크립트처럼 사용 가능
// 하지만 any 타입으로 선언하여 사용할 경우 타입스크립트를 사용할 이유가 없다.
var objTypeAny = {};
objTypeAny.newProperty = "NewProperty";
// 2. Implicit Object Type
var objImplicit = {
    b: "x"
}; // { b : string } 으로 추론
objImplicit.b = "NEW!!"; // String
// 3. Explicit Object Type :  BASIC
var objExplicit = {
    definedProperty: 3
};
// 3 - 1. Explicit Object Type의 기본형읗로 선언된 객체의 경우 Property를 추가하거나 제공하지 않으면 오류가 발생한다.
var objExplicitBluePrint;
// 위 형식대로 제공할 시
objExplicitBluePrint = { num: 3 }; // 가능
// 선언한 리터럴대로 할당하지 않을 시 오류
//objExplicitBluePrint = { newProperty : 3 }; // TS2322: Type '{ newProperty: number; }' is not assignable to type '{ num: number; }'.   Object literal may only specify known properties, and 'newProperty' does not exist in type '{ num: number; }'.
// 객체에 Property를 새로 추가하면 오류
//objExplicitBluePrint.newProperty = "NEW!"; //TS2339: Property 'newProperty' does not exist on type '{ num: number; }'.
// objExplicitBluePrint = { num : 3 , newProperty : "NEW!" } // TS2322: Type '{ num: number; newProperty: string; }' is not assignable to type '{ num: number; }'.   Object literal may only specify known properties, and 'newProperty' does not exist in type '{ num: number; }'.
// 위 결과에 따라 우리는 타입스크립트가 객체 프로퍼티에 엄격하다는 것을 알 수 있다.
// 타입스크립트는 a라는 객체레 b라는 프로퍼티가 있다는 것을 기대한다면 b가 없가나 다른 프로퍼티가 추가된다면 오류를 발생한다.
/** TypeScript의 새로운 프로퍼티 할당 */
// 타입스크립트에서 객체에 새로운 프로터피가 있다는 것을 알려줘야 객체에 새로 프로퍼티를 할당할 수 있다.
var objPropertyLiteral;
// 1. any : 바닐라 스크립트랑 비슷하게 사용 가능
var objAny = {};
objAny.newProperty = "NEW!";
// 2. objPropertyLiteral에서 선언한대로 사용할 경우
// 1. 선언한 프로퍼티는 반드시 존재해야 함
objPropertyLiteral = {
    mustHave: "3",
    notSetting: "재할당하지마"
};
// 2. ?로 선언한 프로퍼티는 추가할 수 있다.
objPropertyLiteral.mayHave = "HIHI";
// 3. 인덱스 시그니쳐 ( [key : type]  : type )로 정의한 객체 프로퍼티는 해당 타입으로 선언할 수 있음
// 인덱스 시그니쳐  : [key : T] : U -> 이 객체의 모든 타입 T는 U 타입의 값을 가진다.
// key는 이름을 자유롭게 변경할 수 있으며 [myProperty : string ] : string, T는 반드시 string,number에 할당할 수 있는 값이어야 한다.
objPropertyLiteral[3] = 3;
// 4. readOnly로 선언한 프로퍼티는 초기값 설정 후 할당할 수 없음
// objPropertyLiteral.notSetting = "재할당할건데?" // Attempt to assign to const or readonly variable
// Object타입도 존재하며 {}과 비슷하나 비추천
/** 타입스크립트에서 자유롭게 프로퍼티를 추가할 수 있는 방법 */
// 1. any 타입 : 비추천, 타입스크립트를 사용하는 의미가 없다.
var objAny1;
objAny1 = {};
objAny1.a = 3;
// 2.type {} : undefined나 null이 아니라면 빈 객체 타입에 할당 가능 , 단 추가는 불가능, 비추천 사유는 위와 같음
var objEmptyLiteral;
objEmptyLiteral = { a: 3 };
objEmptyLiteral = { a: 3, b: "x" };
objEmptyLiteral = [];
objEmptyLiteral = 3;
// 3. type Object : object 타입 아님! {}과 비슷
var objTypeObject;
objTypeObject = {
    3: 3,
    add: "new"
};
// {}와 Object 타입의 차이점 : 전부 똑같으나 프로토타입의 내장 메소드 접근 측면에서 다르다.
// {} : Object 프로토타입 내장 메소드 ( .toString() 등 )을 재정의 원하는 타입으로 재정의 할 수 있다.
// Object : 해당 내장메소드에 정의된 타입을 할당할 수 있는지 여부를 반환
var objLiteralProto = { toString: function () { return 3; } };
console.log(objLiteralProto.toString());
// 4. 인덱스 시그니쳐를 사용한다.
var objAddPropertyFree;
objAddPropertyFree = {};
objAddPropertyFree.newProperty = "NEW!!";
objAddPropertyFree[3] = "NEW!!";
/**
 * Typescript의 Object 타입
 *
 * @desc 타입스크립트의 객체 타입 선언
 * <pre>
 *     자바스크립트는 구조 기반 타입 ( 덕 타이핑이라고 한다. )을 갖는다.
 *     따라서 타입스크립트도 자바스크립트 스타일을 선호한다.
 * </pre>
 * */
/** 할당 */
/**
 * object 타입으로 선언
 * 1. object 타입으로 명시적으로 선언할 경우 할당된 객체 리터럴의 프로퍼티에 접근할 수 없는 오류가 생긴다.
 * 2. object 타입으로 선언해서 유용한 경우는 object 타입의 내장 프로토타입을 재할당 할 경우이다.
 * */
var newObj = {
    key: "value"
};
// 1. object 타입으로 명시적으로 선언할 경우 할당된 객체 리터럴의 프로퍼티에 접근할 수 없는 오류가 생긴다.
// console.log( newObj.key )
// 2. object 타입으로 선언해서 유용한 경우는 object 타입의 내장 프로토타입을 재할당 할 경우이다.
var reObj = {
    toString: function () {
        return "안녕안녕안녕하세요";
    }
};

console.log("안녕안녕안녕");
console.log(reObj.toString());
/** 오류 */
/**
 * object 타입으로 명시적으로 선언할 경우 할당된 객체 리터럴의 프로퍼티에 접근할 수 없는 오류가 생긴다.
 * @error TS2339: Property 'key' does not exist on type 'object'.
 * */

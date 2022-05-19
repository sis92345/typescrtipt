/** Symbol */


// 0. Symbol에 대한 간략한 설명

// Symbol은 Symbol() 함수를 이용해서 생성할 수 있다. 단 new 연산자로 생성하지 못하다.
// Symbol()은 Symbol 원시값을 반환하며 Symbol은 객체의 정적 프로퍼티와 전역 심볼 레지스트리를 가르키는 정적 메소드를 가진다.

// Symbol의 생성
let myType = Symbol( "value" );
let myType2 = Symbol( "value" );

// Symbol 생성시 전달한 문자열은 Sumbol은 description 용도로만 사용된다.
console.log( myType === Symbol( "value" ) ); //false

// Symbol은 유일한 값이므로 객체의 고유한 Property를 생성하는데 사용된다. 따라서 프로퍼티를 잘못 설정하는 실수를 방지한다.
// 또한 객체의 기본 반복자를 설정하거나 객체가 어떤 인스턴스인지 런타임에 오버라이딩 하는것 과 비슷한 기능을 제공한다.
// 생성된 Symbol은 고유하므로 ===, ==으로 비교할 수 없다.
console.log( "심볼 같은지 추론" );
console.log( myType === myType2 );

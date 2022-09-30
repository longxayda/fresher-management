import ManageClass from "./index";
import renderer from "react-test-renderer";

import Link from "./index";

// describe("test 1", () => {
//   // 1.Using Matchers
//   test("two plus two is four", () => {
//     expect(2 + 2).toBe(4);
//   });

//   test("object assignment", () => {
//     const data = { one: 1 };
//     data["two"] = 2;
//     expect(data).toEqual({ one: 1, two: 2 });
//   });

//   // 2. Test Truthiness (kiểm tra tính đúng đắn)
//   test("null", () => {
//     const n = null;
//     expect(n).toBeNull();
//     expect(n).toBeDefined();
//     expect(n).not.toBeUndefined();
//     expect(n).not.toBeTruthy();
//     expect(n).toBeFalsy();
//   });

//   test("zero", () => {
//     const z = 0;
//     expect(z).not.toBeNull();
//     expect(z).toBeDefined();
//     expect(z).not.toBeUndefined();
//     expect(z).not.toBeTruthy();
//     expect(z).toBeFalsy();
//   });

//   // 3. Number:
//   test("two plus two", () => {
//     const value = 2 + 2;
//     expect(value).toBeGreaterThan(3);
//     expect(value).toBeGreaterThanOrEqual(3.5);
//     expect(value).toBeLessThan(5);
//     expect(value).toBeLessThanOrEqual(4.5);

//     // toBe and toEqual are equivalent for numbers
//     expect(value).toBe(4);
//     expect(value).toEqual(4);
//   });

//   // 4. String:
//   test("there is no I in team", () => {
//     expect("team").not.toMatch(/I/);
//   });

//   test('but there is a "stop" in Christoph', () => {
//     expect("Christoph").toMatch(/stop/);
//   });

//   // 5. Array:
//   const shoppingList = [
//     "diapers",
//     "kleenex",
//     "trash bags",
//     "paper towels",
//     "beer",
//   ];

//   test("the shopping list has beer on it", () => {
//     expect(shoppingList).toContain("beer");
//   });

//   // 6. Exception:
//   function compileCode() {
//     throw new Error("you are using the wrong");
//   }

//   test("compiling android goes as expected", () => {
//     expect(compileCode).toThrow();

//     // You can also use the exact error message or a regexp
//     expect(compileCode).toThrow("you are using the wrong");
//   });

//   // 7. Callbacks

//   test("the data is peanut butter", (done) => {
//     const fetchData = (callback) => {
//       setTimeout(() => {
//         callback("peanut butter");
//       }, 1000);
//     };
//     function callback(data) {
//       expect(data).toBe("peanut butter");
//       done();
//     }

//     fetchData(callback);
//   });

//   const fetchData = () => {
//     return new Promise((res) => {
//       setTimeout(() => {
//         res("peanut butter");
//       }, 1000);
//     });
//   };
//   // 8. Promise:
//   test("the data is peanut butter", () => {
//     expect.assertions(1);
//     return fetchData().then((data) => {
//       expect(data).toBe("peanut butter");
//     });
//   });

//   // 9. Async / await

//   test("the data is peanut butter", async () => {
//     expect.assertions(1);
//     const data = await fetchData();
//     expect(data).toBe("peanut butter");
//   });

//   // test("the fetch fails with an error", async () => {
//   //   expect.assertions(1);
//   //   try {
//   //     await fetchData();
//   //   } catch (e) {
//   //     expect(e).toMatch("error");
//   //   }
//   // });

//   // 10. mock function

//   test("mock function test", () => {
//     function forEach(items, callback) {
//       for (let index = 0; index < items.length; index++) {
//         callback(items[index]);
//       }
//     }
//     const mockCallback = jest.fn((x) => 42 + x);
//     forEach([0, 1], mockCallback);

//     // The mock function is called twice
//     expect(mockCallback.mock.calls.length).toBe(2);

//     // The first argument of the first call to the function was 0
//     expect(mockCallback.mock.calls[0][0]).toBe(0);

//     // The first argument of the second call to the function was 1
//     expect(mockCallback.mock.calls[1][0]).toBe(1);

//     // The return value of the first call to the function was 42
//     expect(mockCallback.mock.results[0].value).toBe(42);
//   });
// });

// describe("test 2", () => {
//   it("renders a snapshot", () => {
//     const tree = renderer.create(<Link />).toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

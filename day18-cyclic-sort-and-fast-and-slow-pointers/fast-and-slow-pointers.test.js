const { hasCycle, Node } = require("./fast-and-slow-pointers");

describe("hasCycle", () => {
  test("1->2->3->back to 2 => true", () => {
    const head = new Node(1);
    head.next = new Node(2);
    head.next.next = new Node(3);
    head.next.next.next = head.next;
    expect(hasCycle(head)).toEqual(true);
  });

  test("1->2->3 => false", () => {
    const head = new Node(1);
    head.next = new Node(2);
    head.next.next = new Node(3);
    expect(hasCycle(head)).toEqual(false);
  })
})
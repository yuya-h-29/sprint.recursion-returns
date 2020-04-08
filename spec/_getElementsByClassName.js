require("jsdom-global")();
const $ = require("jquery");
const chai = require("chai");
const { spy } = require("sinon");
const sinonChai = require("sinon-chai");

const { getElementsByClassName } = require("../src/getElementsByClassName");

chai.use(sinonChai);
const { expect } = chai;

const htmlStrings = [
  "<p></p>",
  '<div><div class="testing"></div></div>',
  '<div><div class="targetClassName"></div></div>',
  '<div><button class="targetClassName"></button></div><div class="classname"></div>',
  '<div><p class="targetClassName"><b>asdfasdf</b></p></div><div class="classname"><span></span></div>',
  '<div><p class="targetClassName"><b>asdfasdf</b></p></div><div class="classname"><span class="span test"></span></div>',
  '<div class="a"><p class="targetClassName asdf"><b>aasdfasdfsdfasdf</b></p></div><div class="classname"><span class="span test"></span></div>',
];

describe("getElementsByClassName", () => {
  beforeEach(() => {
    $("body").addClass("targetClassName");
  });

  afterEach(() => {
    $("body").removeClass("targetClassName");
  });

  it("should not use the native method", () => {
    const nativeSpy = spy(document, "getElementsByClassName");

    try {
      const $rootElement = $(htmlStrings[0]);
      $("body").append($rootElement);
      getElementsByClassName("targetClassName");

      expect(nativeSpy).not.to.have.been.called;
    } finally {
      nativeSpy.restore();
    }
  });

  for (let i = 0; i < htmlStrings.length; i++) {
    testHTMLStrings(htmlStrings[i], i);
  }

  function testHTMLStrings(htmlString, index) {
    it(`should match the results of calling the getElementsByClassName method, htmlStrings index: ${index}`, () => {
      const $rootElement = $(htmlString);
      $("body").append($rootElement);
      const result = getElementsByClassName("targetClassName");
      const expectedNodeList = document.getElementsByClassName(
        "targetClassName"
      );
      const expectedArray = Array.prototype.slice.apply(expectedNodeList);
      expect(result).to.eql(expectedArray);
      $rootElement.remove();
    });
  }
});

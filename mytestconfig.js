console.log("in mytestconfig.js");
config = {
  url: "test.txt",
  fun1: async function (inputElement) {
    function buildHtml(x, jobtitle) {
      if (x && x.length > 0) {
        let qText = `Which occupation best describes your job [${jobtitle}]?`;
        x.forEach((soc, indx) => {
          qText = `${qText} <input type="radio" id="EMPLOY_${indx}" name="SOCcerResult"><label for="EMPLOY_${indx}">${soc.label}</label>\n`;
        });
        document.getElementById("q1").innerHTML = qText;
        console.log(qText);
      }
    }
    let jobtitle = inputElement.previousElementSibling.value;
    let cache = await localforage.getItem("soccer");
    if (!cache) cache = {};
    if (cache[jobtitle]) {
      buildHtml(cache[jobtitle], jobtitle);
      console.log("built from CACHE...");
      return;
    }
    if (!jobtitle) return;
    let URL = `https://sitf-cwlcji5kxq-uc.a.run.app/soccer/code?title=${jobtitle}`;
    zz = fetch(URL)
      .then((x) => x.json())
      .then((x) => {
        console.log(x);
        buildHtml(x, jobtitle);
        console.log("build from API");
        cache[jobtitle] = x;
        localforage.setItem("soccer", cache);
      });
  },

  fun1a: function (divElement) {
    divElement.innerHTML = `<form id="EMPLOY">
      What is your job title <input type="text" id="jobtitle" />
      <input type="button" value="Enter Job" onclick="config.fun1(this)">
      <div id="q1"></div>
    </form>`;
  },
};

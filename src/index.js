import "./styles.css";
import $ from "jquery";
import { firebase, fstore } from "./fb"; // CRUD
import { format } from "date-fns";

let counter = 0;
let subtract = 0;
let position_set = 0;

init();
///
function init() {
  $("form").submit(addReview);
  fstore
    .collection("movies")
    .orderBy("postdate", "asc")
    .get()
    .then((s) => s.docs)
    .then(renderReviews);
}

function renderReviews(docs) {
  let starter = docs.length - 1;

  starter = starter - subtract;

  for (let i = starter; i >= 0; i--) {
    if (counter > 4) {
      let add_more = $("<button>")
        .addClass("review")
        .text("Add 5")
        .click(function () {
          subtract = subtract + 5;
          fstore
            .collection("movies")
            .orderBy("postdate", "asc")
            .get()
            .then((s) => s.docs)
            .then(renderReviews);
          $(add_more).remove();
        });
      add_more.appendTo("#reviews");

      counter = 0;

      break;
    }
    review(docs[i].id, docs[i].data());
    counter++;
  }
}

function review(id, data) {
  let newpost = $("<div>").addClass("review");

  let postdate = data.postdate;
  if (!(postdate instanceof Date)) postdate = postdate.toDate();

  let title = $("<div>")
    .text(data.name + " (" + format(postdate, "yyyy/MM/dd") + ")")
    .appendTo(newpost);

  console.log(title);

  let reviews = $("<div>").text(data.text);
  reviews.appendTo(newpost);

  let likes = $("<div>")
    .attr("id", "likes")
    .text("Likes: " + data.likes);
  likes.appendTo(newpost);

  let btn = $("<button>")
    .data("id", id)
    .text("👍 Like")
    .click(function () {
      like(id, data, this);
    });
  btn.appendTo(newpost);

  if (position_set === 0) {
    newpost.appendTo("#reviews");
  } else {
    newpost.prependTo("#reviews");
    position_set = 0;
  }
}

function addReview(event) {
  event.preventDefault();
  let formData = Object.fromEntries(new FormData(event.target));
  event.target.reset();
  formData.likes = 0;
  formData.postdate = new Date();
  position_set = 1;
  fstore
    .collection("movies")
    .add(formData)
    .then((doc) => {
      review(doc.id, formData);
    });
}

async function like(id, data, btn) {
  await fstore
    .collection("movies")
    .doc(id)
    .update({ likes: firebase.firestore.FieldValue.increment(1) });

  let doc = await fstore.collection("movies").doc(id).get();

  $(btn)
    .parent()
    .find("#likes")
    .text("Likes: " + doc.data().likes);
  $(btn).remove();
}

// function onBtnClick() {
//   const id = $(this).data("id");
//   fstore
//     .collection("todo-items")
//     .doc(id)
//     .delete();
//   $(this).remove();
// }

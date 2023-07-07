const URLS = [
  "https://api.slingacademy.com/v1/sample-data/users",
  "https://api.slingacademy.com/v1/sample-data/blog-posts",
];

const store = {
  isLoading: true,
};

const promises = URLS.map((url) =>
  fetch(url).then((response) => response.json())
);

Promise.all(promises)
  .then(([usersData, postsData]) => {
    if (usersData.success) {
      store.users = usersData.users;
    }
    if (postsData.success) {
      store.blogs = postsData.blogs;
    }
  })
  .then(() => {
    render();
    store.isLoading = false;
  })
  .catch((error) => {
    console.log("Нет данных!");
  });

const createUserElement = (data) => {
  let itemElement = document.createElement("div");
  itemElement.classList.add("item");

  let ulElement = document.createElement("ul");

  let liNameElement = document.createElement("li");
  let spanNameFirstElement = document.createElement("span");
  spanNameFirstElement.classList.add("label");
  let spanNameSecondElement = document.createElement("span");
  spanNameSecondElement.innerText = `Name: ${data["first_name"]}`;

  liNameElement.append(spanNameFirstElement);
  liNameElement.append(spanNameSecondElement);

  let liLastNameElement = document.createElement("li");
  let spanLastNameFirstElement = document.createElement("span");
  spanLastNameFirstElement.classList.add("label");
  let spanLastNameSecondElement = document.createElement("span");
  spanLastNameSecondElement.innerText = `Lastname: ${data["last_name"]}`;

  liLastNameElement.append(spanLastNameFirstElement);
  liLastNameElement.append(spanLastNameSecondElement);

  let liEmailElement = document.createElement("li");
  let spanEmailFirstElement = document.createElement("span");
  spanEmailFirstElement.classList.add("label");
  let spanEmailSecondElement = document.createElement("span");
  spanEmailSecondElement.innerText = `Email: ${data.email}`;

  liEmailElement.append(spanEmailFirstElement);
  liEmailElement.append(spanEmailSecondElement);

  let liJobElement = document.createElement("li");
  let spanJobFirstElement = document.createElement("span");
  spanJobFirstElement.classList.add("label");
  let spanJobSecondElement = document.createElement("span");
  spanJobSecondElement.innerText = `Job: ${data.job}`;

  liJobElement.append(spanJobFirstElement);
  liJobElement.append(spanJobSecondElement);

  ulElement.append(liNameElement);
  ulElement.append(liLastNameElement);
  ulElement.append(liEmailElement);
  ulElement.append(liJobElement);

  itemElement.append(ulElement);

  itemElement.addEventListener("click", function () {
    openModalBlog(data.id);
  });

  return itemElement;
};

function openModalBlog(id) {
  let modal = document.querySelector(".modal");
  let modalContent = modal.querySelector(".modal__content > ul");

  modalContent.innerHTML = "";

  let filteredBlogs = store.blogs.filter((blog) => blog.user_id === id);

  modal.classList.add("modal__active");

  if (filteredBlogs.length > 0) {
    let header = document.createElement("h3");
    header.innerText = "Список постов пользователя:";
    modalContent.append(header);

    filteredBlogs.forEach((blog, index) => {
      let li = document.createElement("li");
      li.classList.add("liModal");
      li.innerText = `${index + 1}) ${blog.title}`;
      modalContent.append(li);
    });
  } else {
    let li = document.createElement("li");
    li.innerText = "У данного пользователя пока нет постов!";
    modalContent.append(li);
  }
};

document.querySelector(".modal__close").addEventListener("click", () => {
  let modal = document.querySelector(".modal");
  modal.classList.remove("modal__active");
});

const createUsersElement = () => {
  let usersElement = document.querySelector(".users");

  store.users.forEach((user) => {
    let item = createUserElement(user);
    usersElement.append(item);
  });
};

function render() {
  createUsersElement();
}

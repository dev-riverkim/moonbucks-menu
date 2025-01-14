// 2주차 요구사항
// step2 요구사항 - 상태 관리로 메뉴 관리하기


//  localStorage에 데이터를 저장하여 새로고침해도 데이터가 남아있게 한다.
//  에스프레소, 프라푸치노, 블렌디드, 티바나, 디저트 각각의 종류별로 메뉴판을 관리할 수 있게 만든다.
//  페이지에 최초로 접근할 때는 에스프레소 메뉴가 먼저 보이게 한다.
//  품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
//  품절 상태 메뉴의 마크업



// <li class="menu-list-item d-flex items-center py-2">
//   <span class="w-100 pl-2 menu-name sold-out">${name}</span>
//   <button
//     type="button"
//     class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
//   >
//     품절
//   </button>
//   <button
//     type="button"
//     class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
//   >
//     수정
//   </button>
//   <button
//     type="button"
//     class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
//   >
//     삭제
//   </button>
// </li>


function moonbucksApp() {
  // selector
  // espresso-menu-form 하위에 요소들이 존재
  const formElem = document.querySelector("#espresso-menu-form");
  const inputElem = document.querySelector("#espresso-menu-name");
  const submitElem = document.querySelector("#espresso-menu-submit-button");
  const listElem = document.querySelector("#espresso-menu-list");
  const menuCountElem = document.querySelector(".menu-count");

  // form요소의 기본 동작 초기화
  formElem.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 총 갯수
  const updateMenuTotalCount = () => {
    const menuTotalCount = listElem.childElementCount;
    menuCountElem.innerText = `총 ${menuTotalCount}개`;
  };

  // 메뉴 추가
  const addMenu = () => {
    // inputElem에 입력값이 없을 경우 알림창

    if (inputElem.value === "") {
      alert("값을 입력해 주세요.");
      return;
    }

    const menuItemMarkup = () => {
      return `<li class="menu-list-item d-flex items-center py-2">
                 <span class="w-100 pl-2 menu-name">${inputElem.value}</span>
                  <button
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                  >
                    삭제
                  </button>
                </li>`;
    };
    listElem.insertAdjacentHTML("beforeend", menuItemMarkup());
    updateMenuTotalCount();
    inputElem.value = "";
  };

  // 메뉴 수정
  const editMenu = (e) => {
    const menuNameElem = e.target.closest("li").querySelector(".menu-name");
    const editName = prompt(
      "수정 할 메뉴명을 입력해 주세요.",
      menuNameElem.innerText
    );

    if (editName === "") {
      alert("빈 값은 입력할 수 없습니다.");
      return;
    }

    menuNameElem.innerText = editName;
  };

  // 메뉴 삭제
  const deleteMenu = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      e.target.closest("li").remove();
      updateMenuTotalCount();
    }
  };

  inputElem.addEventListener("keypress", (e) => {
    // Enter 외 다른 입력은 리턴처리
    if (e.key !== "Enter") {
      return;
    }
    addMenu();
  });

  submitElem.addEventListener("click", addMenu);

  // 이벤트 위임 사용
  listElem.addEventListener("click", (e) => {
    // 수정 - prompt 사용
    if (e.target.classList.contains("menu-edit-button")) {
      editMenu(e);
    }

    // 삭제 - confirm 사용
    if (e.target.classList.contains("menu-remove-button")) {
      deleteMenu(e);
    }
  });
}

moonbucksApp();

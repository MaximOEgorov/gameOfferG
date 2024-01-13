export function renderSelect(elements, defaultValue, selectName='') {
  const div = document.createElement("div");
  div.classList.add('subsettings');

  const pElement = document.createElement('p');
  pElement.append(selectName);
  div.appendChild(pElement);

  const select = document.createElement("select");

  elements.forEach((element, index) => {
    const option = document.createElement("option");
    option.value = JSON.stringify(element.data);
    option.text = element.name;
    select.appendChild(option);
    if (option.value === JSON.stringify(defaultValue?.data)) {
      select.selectedIndex = index;
    }
  });

  div.appendChild(select)
  return [div, select];
}

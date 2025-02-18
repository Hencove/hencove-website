export const MonthFilterHandler = {
	containerSelector: ".is-the-month-filter",
	listSelector: ".wp-block-list",

	init() {
		document.addEventListener("DOMContentLoaded", () => {
			this.setupMonthFilter();
		});
	},

	setupMonthFilter() {
		const container = this.getContainer();

		if (!container) return;

		const list = this.getList(container);

		if (!list) return;

		const selectedMonth = this.getSelectedMonthFromURL();

		if (selectedMonth) {
			this.highlightActiveLink(list, selectedMonth);
		}

		const select = this.createDropdown(list, selectedMonth);
		container.append(select);
		this.initializeSelect2(select);

		this.bindDropdownChange(select);
		this.scrollToContainer(container, selectedMonth);
	},

	getContainer() {
		const container = $(this.containerSelector);
		return container.length ? container : false;
	},

	getList(container) {
		const list = container.find(this.listSelector);
		return list.length ? list : false;
	},

	getSelectedMonthFromURL() {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get("month");
	},

	highlightActiveLink(list, selectedMonth) {
		list.find("li > a").each(function () {
			const queryMonth = new URL(
				$(this).attr("href"),
				window.location.origin
			).searchParams.get("month");
			if (queryMonth === selectedMonth) {
				$(this).addClass("active");
			}
		});
	},

	createDropdown(list, selectedMonth) {
		const select = $("<select><option></option></select>").addClass(
			"select2-dropdown"
		);

		list.find("li > a").each(function () {
			const href = $(this).attr("href");
			const text = $(this).text();
			let queryMonth;

			try {
				queryMonth = new URL(href, window.location.origin).searchParams.get(
					"month"
				);
			} catch (e) {
				console.error("Invalid URL in href:", href);
			}

			const option = $("<option></option>").val(href).text(text);

			if (queryMonth === selectedMonth) {
				option.attr("selected", true);
			}

			select.append(option);
		});

		return select;
	},

	initializeSelect2(select) {
		// console.log("select2 running");
		if ($.fn.select2) {
			select.select2({
				placeholder: "Select a month",
				allowClear: true,
				width: "100%",
				dropdownParent: $(this.containerSelector),
				minimumResultsForSearch: Infinity,
			});
		} else {
			console.warn("Select2 library not loaded.");
		}
	},

	bindDropdownChange(select) {
		select.on("change", function () {
			const url = $(this).val();
			if (url) {
				window.location.href = url;
			}
		});
	},

	scrollToContainer(container, selectedMonth) {
		if (selectedMonth) {
			const offset = container.offset().top - 180;
			setTimeout(() => {
				window.scrollTo(0, offset);
			}, 300);
		}
	},
};

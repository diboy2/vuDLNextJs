import React from "react";
import { act } from "react-dom/test-utils";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render, mount } from "enzyme";
import toJson from "enzyme-to-json";
import JobSelector from "./JobSelector";
import * as FetchContext from "../../context/FetchContext";
import * as Category from "./Category";

const mockCategory = jest.fn();
jest.mock(
    "./Category",
    () =>
        function Category(props) {
            mockCategory(props);
            return <mock-Category />;
        }
);

describe("JobSelector", () => {
    let data;
    let fetchContext;
    beforeEach(() => {
        fetchContext = {
            action: {
                fetchJSON: jest.fn(),
            },
        };
        data = {
            category1: {
                category: "category1",
                jobs: ["testJob1"],
            },
            category2: {
                category: "category2",
                jobs: [],
            },
        };
        jest.spyOn(Category, "default").mockImplementation((props) => {
            mockCategory(props);
        });
        jest.spyOn(FetchContext, "useFetchContext").mockReturnValue(fetchContext);
    });

    it("renders", () => {
        fetchContext.action.fetchJSON.mockResolvedValueOnce({});
        const wrapper = render(<JobSelector />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("sets category components", async () => {
        fetchContext.action.fetchJSON.mockResolvedValue(data);
        await act(() => {
            mount(<JobSelector />);
        });

        expect(mockCategory).toHaveBeenCalledWith({
            data: data.category1,
        });
        expect(mockCategory).toHaveBeenCalledWith({
            data: data.category2,
        });
    });
});

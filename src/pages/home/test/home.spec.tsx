import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "..";

describe('Homepage', () => {
	it('successfully render home page', () => {
		render(<Home />)
		expect(screen.getByText('GitHub Repositories Explorer')).toBeDefined()
	})
})

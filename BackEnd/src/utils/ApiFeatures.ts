import type { Document, FilterQuery, Query } from "mongoose";

interface QueryString {
	[key: string]: any;
	page?: string;
	sort?: string;
	limit?: string;
	fields?: string;
	keyword?: string;
}

export class APIFeatures<T extends Document> {
	private query: Query<T[], T>;
	private queryString: QueryString;

	constructor(query: Query<T[], T>, queryString: QueryString) {
		this.query = query;
		this.queryString = queryString;
	}

	filter(): this {
		const queryObj = { ...this.queryString };
		const excludedFields = ["page", "sort", "limit", "fields", "keyword"];
		excludedFields.forEach((el) => delete queryObj[el]);

		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(
			/\b(gte|gt|lte|lt|ne|in|nin|regex)\b/g,
			(match) => `$${match}`,
		);

		const mongoQuery: FilterQuery<T> = JSON.parse(queryStr);
		this.query = this.query.find(mongoQuery);

		return this;
	}

	search(searchFields: (keyof T)[] = ["name" as keyof T]): this {
		if (this.queryString.keyword) {
			const regex = new RegExp(this.queryString.keyword, "i");
			const orQuery = searchFields.map((field) => ({
				[field]: regex,
			})) as FilterQuery<T>[];

			this.query = this.query.find({ $or: orQuery });
		}
		return this;
	}

	sort(): this {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(",").join(" ");
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort("-createdAt");
		}
		return this;
	}

	limitFields(): this {
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(",").join(" ");
			this.query = this.query.select(fields);
		} else {
			this.query = this.query.select("-__v");
		}
		return this;
	}

	paginate(): this {
		const page = Number(this.queryString.page) || 1;
		const limit = Number(this.queryString.limit) || 100;
		const skip = (page - 1) * limit;

		this.query = this.query.skip(skip).limit(limit);
		return this;
	}

	getQuery(): Query<T[], T> {
		return this.query;
	}
}

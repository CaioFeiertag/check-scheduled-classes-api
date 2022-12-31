const config = {
	preset: "ts-jest",
	setupFiles: ["<rootDir>/.jest/setEnv.ts"],
	collectCoverageFrom: [
		"<rootDir>/src/**/*.ts",
		"!<rootDir>/src/**/protocol.ts",
		"!<rootDir>/src/factories/data-source-factory.ts",
		"!<rootDir>/src/config/**",
		"!<rootDir>/src/index.ts",
		"!<rootDir>/src/db/typeorm-entities/**",
		"!<rootDir>/src/db/typeorm-migrations/**",
		"!**/protocols/**",
		"!**/protocols.ts",
		"!**/entities/**",
		"!**/test/**",
		"!**/tests/**",
	],
	coverageDirectory: "coverage",
	coverageReporters: ["json-summary", "json", "lcov", "text", "clover"],
	coverageProvider: "babel",
	testEnvironment: "node",
	transform: {
		".+\\.ts$": "ts-jest",
	},
	testMatch: ["**/*.(spec|test).ts"],
	moduleNameMapper: {
		"~/(.*)": "<rootDir>/src/$1",
	},
	globals: {
		"ts-jest": {
			isolatedModules: true,
		},
	},
	clearMocks: true,
};

module.exports = config;

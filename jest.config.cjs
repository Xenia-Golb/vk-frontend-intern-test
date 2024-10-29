module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
        '^.+\\.m?js$': 'jest-esm-transformer',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(antd|@ant-design/icons|rc-util|@babel/runtime)/)', // 
    ],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

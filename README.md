# DataSeries

## Introduction

Two-dimensional row-based immutable data store. Suitable to run statistics on timeseries or other data.

Supports:
- Reading data from CSV files
- Sorting, filtering and grouping
- Addding new rows and columns
- Merging multiple DataSeries
- Batch-renaming columns and batch-updating values
- Adding derived data based on segments of data

## Documentation

See the [API documentation](./DataSeries/DataSeries.md).

## Install

- Install through npm: `npm i -S dataseries`
- Requires Node 12 (for private class fields)

## Example

## Contribute

1. Run tests: `npm test`
2. Update docs when publishing: `npm run docs`
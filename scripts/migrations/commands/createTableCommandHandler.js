"use strict";
var Framework = require('../../framework');
var Domain = require('../../domain');
var ApplicationServices = require('../../applicationservices');
var migrationAggregateRoot_1 = require('../domain/migrationAggregateRoot');
var CreateTableCommandHandler = (function () {
    function CreateTableCommandHandler() {
        this.HandlesCommand = "CreateTable";
    }
    CreateTableCommandHandler.prototype.handle = function (createTableCommand) {
        var then = new Framework.Then();
        Domain.AggregateRootService.Instance.getByID(migrationAggregateRoot_1.MigrationAggregateRoot, createTableCommand.AggregateRootID, function (aggregateRoot) {
            aggregateRoot.addTable(createTableCommand, then.run);
        });
    };
    return CreateTableCommandHandler;
}());
exports.CreateTableCommandHandler = CreateTableCommandHandler;
ApplicationServices.CommandHandlerService.Instance.register(new CreateTableCommandHandler());

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Poll_1 = __importDefault(require("./Poll"));
let Option = class Option extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Option.prototype, "optionId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Option.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Option.prototype, "votes", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Poll_1.default, (poll) => poll.options, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Poll_1.default)
], Option.prototype, "poll", void 0);
Option = __decorate([
    typeorm_1.Entity("options")
], Option);
exports.default = Option;
//# sourceMappingURL=Option.js.map
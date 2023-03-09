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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
const typeorm_1 = require("typeorm");
const comments_entity_1 = require("./comments.entity");
const imageGalery_entity_1 = require("./imageGalery.entity");
const user_entity_1 = require("./user.entity");
let Vehicle = class Vehicle {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Vehicle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicle.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "adType", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60 }),
    __metadata("design:type", String)
], Vehicle.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 2000 }),
    __metadata("design:type", String)
], Vehicle.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal" }),
    __metadata("design:type", Number)
], Vehicle.prototype, "km", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Vehicle.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal" }),
    __metadata("design:type", Number)
], Vehicle.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => imageGalery_entity_1.ImageGalery, { eager: true, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", imageGalery_entity_1.ImageGalery)
], Vehicle.prototype, "imageGalery", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.vehicles),
    __metadata("design:type", user_entity_1.User)
], Vehicle.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comments_entity_1.Comment, (comment) => comment.vehicles),
    __metadata("design:type", Array)
], Vehicle.prototype, "comments", void 0);
Vehicle = __decorate([
    (0, typeorm_1.Entity)("vehicles")
], Vehicle);
exports.Vehicle = Vehicle;

class IndexController < ApplicationController
  before_action :set_verbs

  def index
    @order = @verbs.map(&:id).shuffle
  end

  def list
  end

  private

  def set_verbs
    @verbs = Verb.all
  end
end
